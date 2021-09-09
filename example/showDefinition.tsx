import { definitionAtom, variablesAtom } from 'Platform/state';
import { useAtomValue, useAtomCallback } from 'jotai/utils';
import React, { useCallback } from 'react';
import {
  match, map, pair, replace,
} from 'ramda';
import Worker from './test.worker';

const worker = new Worker();

const Show = () => {
  const def = useAtomValue(definitionAtom);
  // const reg = /%%_(.*?)_%%/g;
  // const jsonStirng = JSON.stringify(def);
  // const result = match(reg, jsonStirng);
  // const usedVariables = map((variable) => {
  //   const tk = replace(/%%_|_%%/g, '', variable).split('.')[0];
  //   return pair(tk, variablesAtom({ id: tk }));
  // }, result);
  const readVaribales = useAtomCallback(useCallback((get) => {
    worker.postMessage(def);
    worker.onmessage = ({ data: { answer } }) => {
      const usedVariables = map((variable) => {
        const tk = replace(/%%_|_%%/g, '', variable).split('.')[0];
        return pair(tk, variablesAtom({ id: tk }));
      }, answer);
      const res = map(([key, v]) => get(v), usedVariables);
      console.log(res);
    };
  }, []));
  return (
    <div style={{ margin: '5rem' }}>
      <button onClick={readVaribales}>show me varibles</button>
    </div>
  );
};

export default Show;
