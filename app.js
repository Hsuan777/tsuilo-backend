const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 若有錯誤會被強制停止，若以 NODE_ENV=dev 啟動則會報 error 訊息出來
process.on('uncaughtException', error => {
  console.error('Uncaught Exception!');
  if (process.env.NODE_ENV === 'dev') {
    console.error(error);
  }
  // 強制停止 process
  process.exit(1);
})

// 連線 mongodb
require('./connections');

const io = require('socket.io')(3001);
io.on('connection', (socket) => {
  console.log('客戶端已連接');

  // 監聽客戶端的消息事件
  socket.on('message', (data) => {
    console.log('收到消息：', data);

    // 廣播消息給其他客戶端
    socket.broadcast.emit('message', data);
  });

  // 監聽客戶端的斷開連接事件
  socket.on('disconnect', () => {
    console.log('客戶端已斷開連接');
  });
});

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/cards', cardsRouter);


// 若有未知情況的 catch
process.on('unhandled Rejection', (err, promise) => {
  console.error('Unhandled Rejection!');
  if (process.env.NODE_ENV === 'dev') {
    console.log('未知的 rejection:', promise, '原因:', err);
  }
})
module.exports = app;
