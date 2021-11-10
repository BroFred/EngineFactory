// const io = require('socket.io')({
//   cors: {
//     origin: 'http://localhost:8081',
//     methods: ['GET', 'POST'],
//   },
// });

// const nsp = io.of((name, query, next) => {
//   next(null, true);
// });
// nsp.on('connection', (socket) => {
//   console.log('connection');

//   socket.on('start', (options) => {
//     options.map((v, k) => {
//       console.log(v);
//       setTimeout(() => socket.emit('data', v), 10000 * k);
//     });
//   });
// });

// io.listen(3000);

const WebSocketServer = require('ws').Server;
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port);
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  const interval = setInterval(() => {
    const type = Math.random() > 0.5 ? 'B' : 'B';
    ws.send(JSON.stringify({ data: [Math.random()*1000, Math.random()*2000, Math.random()*3000], type }));
  }, 2000);
  ws.on('close', () => {
    clearInterval(interval);
    console.log('websocket connection close');
  });
});
