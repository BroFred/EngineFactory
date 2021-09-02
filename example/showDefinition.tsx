import { definitionAtom, variablesAtom } from '@main/jotai';
import { useAtomValue, useAtomCallback } from 'jotai/utils';
import React, { useCallback } from 'react';
import Worker from 'worker-loader!./deep-thought.js';

import {
  match, map, pair, replace,
} from 'ramda';

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
    const res = map(([key, v]) => get(v), usedVariables);

    worker.postMessage(res);
    worker.onmessage = ({ data: { answer } }) => {
      console.log(answer);
    };
  }, []));
  return (
    <>
      {jsonStirng}
      <button onClick={readVaribales}>show me varibles</button>
    </>
  );
};

export default Show;
