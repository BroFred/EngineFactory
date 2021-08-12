import React, { useMemo } from 'react';
import { map, filter } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { tokenMaster } from '../main/store'


const SelectorOptions = (target) => ({ value, label, data, needJoin }) => {
    const setToken = useSetRecoilState(tokenMaster(target));
    return <select name="select" onChange={(e) => {
        const selectedArr = map(([, value]) => value, filter(
            ([flag]) => flag
            , map((v) => [v.selected, v.value], e.target.options)));
        setToken({ value: needJoin ? [selectedArr.join(',')] : selectedArr })
    }} multiple>{
            map(
                (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
                data,
            )
        } </select>
}
const Select = ({ data, options }) => {
    const { value, label, target, needJoin } = options;
    const SO = useMemo(() => SelectorOptions(target), [target])
    return <SO {...{ value, label, data, needJoin }} />


}

export default Select;