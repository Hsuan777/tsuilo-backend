const {Schema, model} = require('mongoose');
const workSpaceScheam = new Schema(
  {
    name: {
      type: String,
      required: [true, '{PATH} 為必要欄位']
    },
    members: [{
      type: Schema.ObjectId,
      ref: "user",
      required: [true, '{PATH} 必須包含建立者 Id']
    }],
    boards: [{
      type: Schema.ObjectId,
      ref: "board",
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
  },
  {
    versionKey: false
  }
)
const WorkSpace = model('user', workSpaceScheam);
module.exports = WorkSpace;
