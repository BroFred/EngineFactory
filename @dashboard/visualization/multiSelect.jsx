import React from 'react';
import { map, filter } from 'ramda';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => null;

export const Edit = ({ dataAtoms, options, variableAtoms }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const setVariable = useUpdateAtom(variableAtoms[0]);
  const data = useObservableState(enginePath, []);

  const { value, label, needJoin } = options;

  return (
    <select
      name="select"
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        const selectedArr = map(([, value]) => value, filter(
          ([flag]) => flag,
          map((v) => [v.selected, v.value], e.target.options),
        ));
        setVariable(needJoin ? [selectedArr.join(',')] : selectedArr);
      }}
      multiple
    >
      {
            map(
              (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
              data,
            )
        }
    </select>
  );
};
