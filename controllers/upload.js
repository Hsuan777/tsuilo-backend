const { v4: uuidv4 } = require('uuid');

const firebaseAdmin = require('../connections/firebase');
const bucket = firebaseAdmin.storage().bucket();

const upload = {
  async postImage(req, res, next) {
    // 取得上傳的檔案資訊
    const file = req.file;
    // 基於檔案的原始名稱建立一個 blob 物件
    // const blob = bucket.file(file.originalname);
    const blob = bucket.file(`images/${uuidv4()}.${file.originalname.split('.').pop()}`);
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream()
    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
      // 設定檔案的存取權限
      const config = {
        action: 'read', // 權限
        expires: '12-31-2500', // 網址的有效期限
      };
      bucket.getFiles().then((data) => {
        const file = data[0][0];
        // 取得檔案的網址
        blob.getSignedUrl(config, (err, imgUrl) => {
          res.send({
            message: '上傳成功',
            imgUrl,
            name: file.name.replace("images/","")
          });
        });
      })
    });
    // 如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on('error', (err) => {
      res.status(500).send('上傳失敗');
    });
    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer);
  },
  async deleteImage(req, res, next) {
     // 取得檔案名稱，需要包含副檔名
    const fileName = req.query.fileName;
    // 取得檔案
    const blob = bucket.file(`images/${fileName}`);
    // 刪除檔案
    blob.delete().then(() => {
      res.send('刪除成功');
    }).catch((err) => {
      res.status(500).send('刪除失敗');
    });
  }
}
module.exports = upload;
