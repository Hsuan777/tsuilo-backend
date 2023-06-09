const Card = require('../models/cardModel.js');
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
  async deleteCard(req, res, next) {

    const posts = await Card.find();
    res.status(200).json({
      status: 'success',
      data: posts
    })
  },
  async deletePost(req, res, next) {
    const searchCard = await Card.findById(req.params.id);
    if (!searchCard) return appError(40003, next, '找不到卡片喔');
    await Post.findByIdAndDelete(req.params.id);
    handleSuccess(res, '刪除資料成功')
  },
}
module.exports = card;
