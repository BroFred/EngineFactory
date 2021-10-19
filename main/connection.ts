import { Manager } from 'socket.io-client';

export const io = new Manager('ws://localhost:3000/', {
  reconnectionDelayMax: 10000,
});

export default io;
