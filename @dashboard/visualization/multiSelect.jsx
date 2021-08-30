import React from 'react';
import { map, filter } from 'ramda';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => {
    return null;
}


export const Edit  = ({ dataAtoms, options, tokenAtoms  }) => {
    const { enginePath } = useAtomValue(dataAtoms[0]);
    const setToken = useUpdateAtom(tokenAtoms[0]);
    const data = useObservableState(enginePath, []);

    const { value, label, needJoin } = options;

    return <select name="select" onMouseDown={ e => e.stopPropagation() } onChange={(e) => {
        const selectedArr = map(([, value]) => value, filter(
            ([flag]) => flag
            , map((v) => [v.selected, v.value], e.target.options)));
            console.log(selectedArr)
        setToken(needJoin ? [selectedArr.join(',')] : selectedArr )
    }} multiple>{
            map(
                (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
                data,
            )
        } </select>


}