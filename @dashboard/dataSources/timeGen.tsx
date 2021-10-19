import { interval, map } from 'rxjs';
import React from 'react';

export const config = () => {
  const source = interval(2000).pipe(map(() => ({ x: new Date(Date.now()).toISOString(), y: Math.random() * 100 })));

  return source;
};

export const Edit = ({ options, setConfig }) => <></>;
