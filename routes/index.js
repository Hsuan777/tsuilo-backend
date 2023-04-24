var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const orders = [];
const RespondType = "JSON";
const { HASHKEY, HASHIV, MerchantID, Version, HOST } = process.env;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createOrder', function(req, res, next) {
  const data = req.body;
  const TimeStamp = Math.round(new Date().getTime() / 1000);
  orders[TimeStamp] = {
    ...data,
    TimeStamp,
    MerchantOrderNo: TimeStamp
  }
  console.log(orders[TimeStamp]);
  res.json(orders[TimeStamp])
});


router.get('/orders/:id', function(req, res, next) {
  const {id} = req.params;
  const order = orders[id];
  // const paramString = genDataChain(order);
  // 產生交易資料
  const aesEncrypt = create_mpg_aes_encrypt(order);
  // 產生加密資料
  const shaEncrypt = create_mpg_sha_encrypt(aesEncrypt);
  res.json({
    order,
    aesEncrypt,
    shaEncrypt
  })
})
function genDataChain(order) {
  const string = `MerchantID=${MerchantID}&RespondType=${RespondType}&TimeStamp=${order.TimeStamp}&Version=${Version}&MerchantOrderNo=${order.TimeStamp}&Amt=${order.Amt}&ItemDesc=${encodeURI(order.ItemDesc)}&Email=${encodeURIComponent(order.Email)}`;
  return string;
}
// 對應文件 P16：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
function create_mpg_aes_encrypt(TradeInfo) {
  const encrypt = crypto.createCipheriv('aes256', HASHKEY, HASHIV);
  const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
  return enc + encrypt.final('hex');
}

// 對應文件 P17：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
function create_mpg_sha_encrypt(aesEncrypt) {
  const sha = crypto.createHash('sha256');
  const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;

  return sha.update(plainText).digest('hex').toUpperCase();
}

// 將 aes 解密
function create_mpg_aes_decrypt(TradeInfo) {
  const decrypt = crypto.createDecipheriv('aes256', HASHKEY, HASHIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, 'hex', 'utf8');
  const plainText = text + decrypt.final('utf8');
  const result = plainText.replace(/[\x00-\x20]+/g, '');
  return JSON.parse(result);
}
module.exports = router;
