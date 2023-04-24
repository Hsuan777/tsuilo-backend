const {Schema, model} = require('mongoose');
const cardSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "{PATH} 為必要欄位"]
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  }
)

const Card = model('card', cardSchema);
module.exports = Card;
