const Card = require('../models/cardModel.js');
const card = {
  async getCards(req, res, next) {
    console.log("getCards");
    const cards = await Card.find().populate("comments.commenter");
    res.status(200).json({
      status: 'success',
      data: cards
    })
  },
  async getCard(req, res, next) {
    console.log("getCard");

    const searchPost = await Card.findById(req.params.id).populate("comments.commenter");
    if (searchPost) {
      res.status(200).json({
        status: 'success',
        data: searchPost
      })
    } else {
      res.status(200).json({
        status: 'failed',
        data: "無資料"
      })
    }
  },
  async patchCard(req, res, next) {
    const searchPost = await Card.findById(req.params.id);
    if (searchPost) {
      const {title, description, isPinned, tags, notification, dateRange, workingHours, importance, comments, toDoList} = req.body;
      const patchData = {
        title: title,
        description: description,
        isPinned: isPinned,
        tags: tags,
        notification: notification,
        dateRange: dateRange,
        workingHours: workingHours,
        importance: importance,
        comments: comments,
        toDoList: toDoList
      }
      await Card.findByIdAndUpdate(req.params.id, {...patchData});
      res.status(200).json({
        status: 'success',
        data: "修改資料成功"
      })
    }
  },
  async postCard(req, res, next) {
    const { title } = req.body;
    if (title === undefined) return
    const newPost = await Card.create({
      title
    });
    res.status(200).json({
      status: 'success',
      data: newPost
    })
  },
  async deleteCard(req, res, next) {
    const searchCard = await Card.findById(req.params.id);
    if (!searchCard) {
      res.status(200).json({
        status: 'failed',
        data: '刪除資料失敗'
      })
      return;
    }
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: '刪除資料成功'
    })
  },
  async postCardComment(req, res, next) {
    const cardData = await Card.findById(req.params.cardId);
    if (cardData) {
      const { comment } = req.body;
      const newComment = {
        commenter: req.user.id,
        comment: comment,
      }
      cardData.comments.push(newComment);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: "新增卡片評論成功"
      })
    }
  },
  async deleteCardComment(req, res, next) {
    const cardId = req.params.cardId;
    const commentId = req.params.commentId;
    const cardData = await Card.findById(cardId);
    const findComment = cardData.comments.filter(comment => comment._id == commentId);
    if (cardData && findComment.length > 0) {
      // 過濾掉要刪除的評論
      cardData.comments = cardData.comments.filter(comment => comment._id != commentId);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '刪除卡片評論成功',
      });
    } else {
      res.status(400).json({
        status: 'failed',
        data: '刪除卡片評論失敗',
      });
    }
  },
  async postCardToDo(req, res, next) {
    const cardData = await Card.findById(req.params.cardId);
    if (cardData) {
      const { title, workingHours, dateRange, isFinished} = req.body;
      const toDo = {
        title: title,
        workingHours: workingHours,
        dateRange: dateRange,
        isFinished: isFinished
      }
      cardData.toDoList.push(toDo);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: "新增卡片待辦清單成功"
      })
    }
  },
  async deleteCardToDo(req, res, next) {
    const cardId = req.params.cardId;
    const toDoId = req.params.toDoId;
    const cardData = await Card.findById(cardId);
    const findToDo = cardData.toDoList.filter(toDo => toDo._id == toDoId);
    console.log(findToDo);
    if (cardData && findToDo.length > 0) {
      // 過濾掉要刪除的 toDo
      cardData.toDoList = cardData.toDoList.filter(toDo => toDo._id != toDoId);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '刪除卡片待辦清單成功',
      });
    } else {
      res.status(400).json({
        status: 'failed',
        data: '刪除卡片待辦清單失敗',
      });
    }
  },
}
module.exports = card;
