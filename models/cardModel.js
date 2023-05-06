const {Schema, model} = require('mongoose');
const cardSchema = new Schema(
  {
    headerCover: String,
    title: String,
    description: String,
    members: [{
      type: Schema.ObjectId,
      ref: "user",
    }],
    comments: [{
      commentText: String,
      commenter: {
        type: Schema.ObjectId,
        ref: "user"
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    labels: [String],
    isPinned: Boolean,
    updateNotification: {
      isTracked: Boolean,
      isNotifiedForMemberChange: Boolean,
      isNotifiedForContentChange: Boolean,
      isNotifiedForTodoListChange: Boolean
    },
    dueDate: Date,
    content: String,
    checkList: [String],
    list: {
      type: Schema.ObjectId,
      ref: "list",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false
  }
)

const Card = model('card', cardSchema);
module.exports = Card;
