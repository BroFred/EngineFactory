import React from 'react';
import { map } from 'ramda';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => null;

export const Edit = ({ dataAtoms, options, variableAtoms }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const setVariable = useUpdateAtom(variableAtoms[0]);
  const data = useObservableState(enginePath, []);

  const { value, label } = options;

  return (
    <select name="select" onChange={(e) => setVariable([e.target.value])}>
      {
        map(
          (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
          data,
        )
    }
      {' '}

    </select>
  );
};
