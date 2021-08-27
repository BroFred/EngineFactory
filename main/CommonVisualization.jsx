import React, { lazy, useEffect } from 'react';
import { useAtom } from 'jotai'
import { atomWithToken } from './jotai';
import {map} from 'ramda';

const VizCommon = ({ options, enginePath, id }) => {
    const [config, setConfig] = useAtom(atomWithToken({ options, enginePath, id, type:'visualization' }));
    const dsAtoms = map((ds)=>atomWithToken({id:ds}),config.options.dataSources);

    const  Comp  = lazy(async()=> {
        const {Edit} = await import(`@dashboard/visualization/${enginePath}`);
        return {default: Edit};
    });

    return <Comp options={config.options} setConfig={setConfig} dataAtoms={dsAtoms}/>;
}

export default VizCommon;