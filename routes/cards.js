const express = require('express');
const router = express.Router();
const CardControllers = require('../controllers/card.js');
const handleErrorAsync = require("../service/handleErrorAsync");

// router.get('/', isAuth, handleErrorAsync((req, res, next) => PostsControllers.getPosts(req, res, next)));
router.get('/', handleErrorAsync((req, res, next) => CardControllers.getCards(req, res, next)));
router.post('/', handleErrorAsync((req, res, next) => CardControllers.postCard(req, res, next)));
router.patch('/:id', handleErrorAsync((req, res, next) => CardControllers.patchCard(req, res, next)));
router.delete('/:id', handleErrorAsync((req, res, next) => CardControllers.deleteCard(req, res, next)));

module.exports = router;
