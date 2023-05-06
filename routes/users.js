const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const UserControllers = require('../controllers/user');
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require('../service/auth');
const upload = require('../service/upload');

router.get('/check', cors({ exposedHeaders: 'Authorization' }), isAuth, handleErrorAsync((req, res, next) => UserControllers.check(req, res, next)));

// signup/signin
router.post('/signup', handleErrorAsync((req, res, next) => UserControllers.signup(req, res, next)));
router.post('/signin', cors({ exposedHeaders: 'Authorization' }), handleErrorAsync((req, res, next) => UserControllers.signin(req, res, next)));

// google 登入
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));
// google callback
router.get('/google/callback', passport.authenticate('google', {session: false}), handleErrorAsync((req, res, next) => UserControllers.googleSignIn(req, res, next)));
// callback
router.get('/TPcallback', cors({ exposedHeaders: 'Authorization' }), handleErrorAsync((req, res, next) => UserControllers.thirdPartyCallback(req, res, next)));

// profile
router.get('/profile', isAuth, handleErrorAsync((req, res, next) => UserControllers.profile(req, res, next)));
router.post('/updatePassword', isAuth, handleErrorAsync((req, res, next) => UserControllers.updatePassword(req, res, next)));
router.patch('/profile', isAuth, upload.array('photo', 1), handleErrorAsync((req, res, next) => UserControllers.updateProfile(req, res, next)));

module.exports = router;
