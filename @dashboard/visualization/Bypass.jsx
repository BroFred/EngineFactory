import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => {
    return null;
}

export const Edit = ({ dataAtoms, options, setConfig }) => {
    const { enginePath } = useAtomValue(dataAtoms[0]);
    const data = useObservableState(enginePath, []);
    return <><div>{
        JSON.stringify(data)
    }</div>
    {/* <textarea style={{height: 300}} value={JSON.stringify(options)} onChange={(e)=>setConfig( JSON.parse(e.target.value))}/> */}
    </>
}

