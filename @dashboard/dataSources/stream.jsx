import { interval, scan, take } from 'rxjs';
import React from 'react';
import { woker$ } from '@main/utils';

export const config = ({ data }) => {
  const source = woker$({ input$: interval(1000).pipe(take(data.length), scan((acc, curr) => (data[curr] ? [...acc, data[curr]] : acc), [])) });
  return source;
};

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;
