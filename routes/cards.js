const express = require('express');
const router = express.Router();
const CardControllers = require('../controllers/card.js');

router.get('/', (req, res, next) => CardControllers.getCards(req, res, next));
router.post('/', (req, res, next) => CardControllers.postCard(req, res, next));
router.patch('/:id', (req, res, next) => CardControllers.patchCard(req, res, next));

module.exports = router;
