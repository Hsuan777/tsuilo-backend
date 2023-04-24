const Card = require('../models/card.js');
const card = {
  async getCards(req, res, next) {
    const posts = await Card.find();
    res.status(200).json({
      status: 'success',
      data: posts
    })
  },
  async patchCard(req, res, next) {
    const searchPost = await Card.findById(req.params.id);
    if (searchPost) {
      await Card.findByIdAndUpdate(req.params.id, {content: req.body.content});
    }
    res.status(200).json({
      status: 'success',
      data: "修改資料成功"
    })
  },
  async postCard(req, res, next) {
    const { content } = req.body;
    if (content === undefined) return
    const newPost = await Card.create({
      content
    });
    res.status(200).json({
      status: 'success',
      data: newPost
    })
  },
}
module.exports = card;
