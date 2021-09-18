const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST'],
  },
});

const nsp = io.of((name, query, next) => {
  next(null, true);
});
nsp.on('connection', (socket) => {
  console.log('connection');

  socket.on('start', (options) => {
    options.map((v, k) => {
      console.log(v);
      setTimeout(() => socket.emit('data', v), 10000 * k);
    });
  });
});

io.listen(3000);
