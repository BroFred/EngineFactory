import { Manager } from 'socket.io-client';
import { webSocket } from 'rxjs/webSocket';
import { retryWhen, tap, delay } from 'rxjs/operators';

// const source = new EventSource('https://localhost:3001/countdown');
// source.onmessage = function (e) {
//   e.data < 5 && source.close();
//   console.log(e.data);
// };

const subject = webSocket('ws://localhost:3000').pipe(
  retryWhen((errors) => errors.pipe(
    tap((err) => {
      console.error('Got error', err);
    }),
    delay(1000),
  )),
);

// export const io = new Manager('ws://localhost:3000/', {
//   reconnectionDelayMax: 10000,
// });
subject.subscribe((messageForB) => console.log(messageForB));

export default subject;

// This is singleton websocket connection, every thing comes from here with is't namespace
// ref: https://rxjs.dev/api/webSocket/webSocket
