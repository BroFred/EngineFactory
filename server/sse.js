const express = require('express');
const cors = require('cors');
const spdy = require('spdy');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

app.use(cors({
  origin: true,
  credentials: true,
}));
function countdown(res, count) {
  if (count) {
    res.write(`data: ${count}\n\n`);
    setTimeout(() => countdown(res, count - 1), 1000);
  } else {
    // res.end();
  }
}
app.get('/countdown', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write(`data: ${JSON.stringify([1, 2, 3])}\n\n`);
  //   countdown(res, 10);
  setInterval(() => {
    res.write(`data: ${JSON.stringify([1, 2, 3])}\n\n`);
  }, 3000);
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
};
spdy
  .createServer(options, app)
  .listen(3001, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    }
    console.log('Listening on port:3001');
  });
