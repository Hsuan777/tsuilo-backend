const {Schema, model} = require('mongoose');
const userScheam = new Schema(
  {
    name: {
      type: String,
      required: [true, '{PATH} 為必要欄位']
    },
    email: {
      type: String,
      required: [true, '{PATH} 為必要欄位'],
      unique: true,
      lowercase: true,
      select: false
    },
    avatar: {
      type: String,
      default: "https://i.imgur.com/L8RBPEt.png",
    },
    password: {
      type: String,
      required: [true, '{PATH} 為必要欄位'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    googleId: {
      type: String,
      select: false,
    },
  },
  {
    versionKey: false
  }
)
const User = model('user', userScheam);
module.exports = User;
