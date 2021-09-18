import { Observable } from 'rxjs';
import { Manager } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export const fromWebSocket = (
  io : Manager<DefaultEventsMap, DefaultEventsMap>,
  namespace: string,
  options: {
    [key:string] : any;
  },
): Observable<unknown> => {
  const data$ = new Observable((subscriber) => {
    const socket = io.socket(`/${namespace}`);
    socket.on('data', (data) => {
      subscriber.next(data);
    });
    socket.emit('start', options);

    return () => {
      console.log('socket disconnected');
      socket.emit('stop');
      socket.offAny();
      socket.disconnect();
    };
  });
  return data$;
};

export default fromWebSocket;
