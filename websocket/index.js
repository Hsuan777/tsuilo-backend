const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.send('已成功建立連線');
  ws.on('message', function message(data) {
    console.log('received: %s', JSON.parse(data));
    ws.send("已收到資料")
  });
});
