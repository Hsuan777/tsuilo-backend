var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
