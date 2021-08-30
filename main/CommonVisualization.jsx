import React, { lazy, forwardRef } from 'react';
import { useAtom } from 'jotai'
import { atomWithToken, tokensAtom } from './jotai';
import {map} from 'ramda';

const VizCommon = ({ options, enginePath, id }) => {
    const [config, setConfig] = useAtom(atomWithToken({ options, enginePath, id, type:'visualization' }));
    console.log(config.isWaitingForTokens)
    if(config.isWaitingForTokens){
        return <></>
    }
    const dsAtoms = map((ds)=>atomWithToken({id:ds}),config.options.dataSources ||[]);
    const tkAtoms = map((tk)=>tokensAtom({id:tk}),config.options.tokens|| []);
    const  Comp  = lazy(async()=> {
        const {Edit} = await import(`@dashboard/visualization/${enginePath}`);
        return {default: Edit};
    });

    return <Comp options={config.options} setConfig={setConfig} dataAtoms={dsAtoms} tokenAtoms={tkAtoms}/>;
}

export default VizCommon;