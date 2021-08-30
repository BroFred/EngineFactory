import React from 'react';
import { map } from 'ramda';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';


export const config = () => {
    return null;
}


export const Edit = ({ dataAtoms, options, tokenAtoms }) => {
    const { enginePath } = useAtomValue(dataAtoms[0]);
    const setToken = useUpdateAtom(tokenAtoms[0]);
    const data = useObservableState(enginePath, []);

    const { value, label } = options;

    return <select name="select" onChange={(e) => setToken([e.target.value])}>{
        map(
            (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
            data,
        )
    } </select>


}