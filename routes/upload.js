const express = require('express');
const router = express.Router();
const UploadControllers = require('../controllers/upload.js');
const upload = require("../service/upload");
const handleErrorAsync = require("../service/handleErrorAsync");

router.post('/image', upload.single('file'), handleErrorAsync((req, res, next) => UploadControllers.postImage(req, res, next)));

router.delete('/image', handleErrorAsync((req, res, next) => UploadControllers.deleteImage(req, res, next)));

module.exports = router;
