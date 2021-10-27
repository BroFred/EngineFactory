import { Manager } from 'socket.io-client';

export const io = new Manager('ws://localhost:3000/', {
  reconnectionDelayMax: 10000,
});

export default io;

// This is singleton websocket connection, every thing comes from here with is't namespace
// ref: https://rxjs.dev/api/webSocket/webSocket
