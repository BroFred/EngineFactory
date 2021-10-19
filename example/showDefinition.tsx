import { definitionAtom, variablesAtom } from 'Platform/state';
import { useAtomCallback, useAtomValue } from 'jotai/utils';

import React, { useCallback } from 'react';

import {
  match, map, pair, replace,
} from 'ramda';
import serialize from 'serialize-javascript';

import Worker from 'Platform/commonWorker';

const worker = new Worker();

const Show = () => {
  const def = useAtomValue(definitionAtom);
  const reg = /%%_(.*?)_%%/g;
  const jsonStirng = JSON.stringify(def);
  const result = match(reg, jsonStirng);
  const usedVariables = map((variable) => {
    const tk = replace(/%%_|_%%/g, '', variable).split('.')[0];
    return pair(tk, variablesAtom({ id: tk }));
  }, result);
  const readVaribales = useAtomCallback(useCallback((get) => {
    worker.postMessage({
      transformations: serialize([
        {
          transformation: 'take',
          args: [5],
        },
        {
          transformation: 'map',
          args: [({ name }) => ({ name: name * 2 })],
        },
      ]),
      data: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }],
    });
    worker.onmessage = ({ data }) => {
      console.log(data);
    };
  }, []));
  return (
    <div style={{ margin: '5rem' }}>
      <button onClick={readVaribales}>show me varibles</button>
    </div>
  );
};

export default Show;
