const express = require('express');
const router = express.Router();
const CardControllers = require('../controllers/card.js');
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require("../service/auth");

router.get('/', handleErrorAsync((req, res, next) => CardControllers.getCards(req, res, next)));
router.get('/:id', handleErrorAsync((req, res, next) => CardControllers.getCard(req, res, next)));
router.post('/', isAuth, handleErrorAsync((req, res, next) => CardControllers.postCard(req, res, next)));
router.post('/:cardId/comment', isAuth, handleErrorAsync((req, res, next) => CardControllers.postCardComment(req, res, next)));
router.post('/:cardId/toDo', isAuth, handleErrorAsync((req, res, next) => CardControllers.postCardToDo(req, res, next)));
router.patch('/:id', isAuth, handleErrorAsync((req, res, next) => CardControllers.patchCard(req, res, next)));
router.delete('/:id', isAuth, handleErrorAsync((req, res, next) => CardControllers.deleteCard(req, res, next)));
router.delete('/:cardId/comment/:commentId', isAuth, handleErrorAsync((req, res, next) => CardControllers.deleteCardComment(req, res, next)));
router.delete('/:cardId/toDoList/:toDoId', isAuth, handleErrorAsync((req, res, next) => CardControllers.deleteCardToDo(req, res, next)));

module.exports = router;
