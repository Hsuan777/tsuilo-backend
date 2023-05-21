const {Schema, model} = require('mongoose');
const cardSchema = new Schema(
  {
    headerCover: {
      type: String
    },
    title: {
      type: String,
      default: "未命名卡片"
    },
    description: {
      type: String,
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
      type: String
    },
    toDoList: [{
      title: String,
      workingHours: Number,
      dateRange: [Number, Number],
      isFinished: Boolean,
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
    workingHours: Number
  },
  {
    versionKey: false
  }
)

const Card = model('card', cardSchema);
module.exports = Card;
