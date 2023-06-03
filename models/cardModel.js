const {Schema, model} = require('mongoose');
const cardSchema = new Schema(
  {
    headerCover: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "未命名卡片"
    },
    description: {
      type: String,
      default: ""
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    members: [{
      type: Schema.ObjectId,
      ref: "user",
    }],
    comments: [{
      comment: String,
      commenter: {
        type: Schema.ObjectId,
        ref: "user"
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    tags: [String],
    notification: {
      type: String,
      enum: ["到期日前兩天", "成員變更時", "卡片開始前兩天"],
      default: "到期日前兩天",
    },
    dateRange: {
      type: Array,
      default: () => [Date.now(), Date.now()]
    },
    content: {
      type: String,
      default: ""
    },
    toDoList: [{
      title: {
        type: String,
        require: true
      },
      workingHours: {
        type: Number,
        default: 0
      },
      dateRange: {
        type: Array,
        default: () => [Date.now(), Date.now()]
      },
      isFinished: {
        type: Boolean,
        default: false
      },
    }],
    list: {
      type: Schema.ObjectId,
      ref: "list",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
    importance: {
      type: String,
      enum: ["高", "中", "低"],
      default: "低",
    },
    workingHours: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
)

const Card = model('card', cardSchema);
module.exports = Card;
