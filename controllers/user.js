const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const User = require('../models/userModel');
const { resSuccess, appError } = require('../service/handles');
const { generateSendJWT } = require('../service/auth');
const roles = require('../service/roles');

let tempData = {};

const user = {
  async signup(req, res, next) {
    const data = req.body;
    const emailExisted = await User.findOne({ email: data.email });
    if (!roles.checkBody('user', data, next)) return
    if (!roles.checkName(data.name, next)) return
    if (!roles.checkEmail(data.email, emailExisted, next)) return
    if (!roles.checkPassword(data.password, data.confirmPassword, next)) return
    data.password = await bcrypt.hash(data.password, 12);
    const newUser = await User.create({
      ...data
    });
    generateSendJWT(201, res, newUser);
  },
  async signin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return appError(40003, next, '帳密不可為空');
    }
    const user = await User.findOne({ email }).select('+password');
    let auth;
    if (user) {
      auth = await bcrypt.compare(password, user.password);
      if (!auth) return appError(40003, next, '密碼不正確');
    } else {
      return appError(40003, next, '信箱不正確')
    }
    if (user && auth) generateSendJWT(200, res, user);
  },
  async googleSignIn(req, res, next) {
    const data = {
      googleId: req.user.sub,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.picture,
    };
    console.log(data);
    res.send("已成功授權 Google 登入")
  },
  async check(req, res, next) {
    if (!req.user) return appError(40003, next, '無此帳號，請聯繫管理員');
    res.send({
      status: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
      },
    });
  },
  async profile(req, res, next) {
    const user = await User.findById(req.user.id);
    resSuccess(res, 200, "susses", user)
  },
  async updateProfile(req, res, next) {
    const data = req.body;
    let userAvatar = '';
    if (!roles.checkBody('userProfile', data, next)) return
    if (!roles.checkName(data.name, next)) return
    if (data.sex !== 'male' && data.sex !== 'female' && data.sex !== '') {
      return appError(40003, next, '請選擇性別或不公開');
    }
    if (req.files.length === 1) {
      userAvatar = await Imgur.upload(req.files, next, 107, 107);
      data.avatar = userAvatar[0].url;
    }
    const result = await User.findByIdAndUpdate(req.user.id, {
      ...data
    }, {new: true});
    resSuccess(res, result)
  },
  async updatePassword(req, res, next) {
    const data = req.body;
    if (!roles.checkBody('userPassword', data, next)) return
    if (!roles.checkPassword(data.password, data.confirmPassword, next)) return
    const newPassword = await bcrypt.hash(data.password, 12);
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      password: newPassword
    });
    generateSendJWT(200, res, updateUser);
  },
}

module.exports = user;
