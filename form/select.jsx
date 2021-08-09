import React, { useMemo } from 'react';
import { map } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { tokenMaster } from '../main/store'


const SelectorOptions = (target) => ({ value, label, data }) => {
    const setToken = useSetRecoilState(tokenMaster(target));
    return <select name="select" onChange={(e)=>setToken({value:[e.target.value]})}>{
        map(
            (d) => <option key={d[label]} value={d[value]}>{d[label]}</option>,
            data,
        )
    } </select>
}
const Select = ({ data, options }) => {
    const { value, label, target } = options;
    const SO = useMemo(() => SelectorOptions(target), [target])
    return <SO {...{ value, label, data }} />
    

}

export default Select;