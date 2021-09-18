import { scan } from 'rxjs/operators';
import React from 'react';
import io from 'Platform/connection';
import fromWebSocket from '@main/utils/fromWebSocket';

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;

export const config = ({ data: ds }) => {
  const data$ = fromWebSocket(io, 'data', ds);

  const $output = data$.pipe(scan((acc, curr) => [...acc, curr], []));
  return $output;
};
