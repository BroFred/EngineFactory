import { scan, pluck, tap } from 'rxjs/operators';
import React from 'react';
import io from 'Platform/connection';
import fromWebSocket from '@main/tools/fromWebSocket';

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;

export const config = ({ data: ds }) => {
  const data$ = io.multiplex( // And the same goes for 'B'.
    () => ({ subscribe: 'B' }),
    () => ({ unsubscribe: 'B' }),
    (message) => message.type === 'B',
  );

  const $output = data$.pipe(pluck('data'), scan((acc, curr) => [...acc, curr], []), tap(console.log));
  return $output;
};
