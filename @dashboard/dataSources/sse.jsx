import { scan, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import React from 'react';

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;

export const config = ({ data: ds }) => {
  const source = new EventSource('https://localhost:3001/countdown');
  const sse$ = new Observable((subscriber) => {
    source.onmessage = function (e) {
      subscriber.next(JSON.parse(e.data));
    };
    return () => source.close();
  });
  const $output = sse$.pipe(scan((acc, curr) => [...acc, curr], []), tap(console.log));
  return $output;
};
