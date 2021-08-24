import React, { useEffect, lazy } from 'React';
import { useAtom } from 'jotai'
import { data, atomWithToken } from './jotai';
import {map} from 'ramda';

const vizDefinition = atomWithToken('visualization');

const DataSourceCommon = ({ options, enginePath, id }) => {
    const [config, setConfig] = useAtom(vizDefinition({ options, enginePath, id }));
    const dsAtoms = map((ds)=>data(ds),config.options.dataSources);
    const  Comp  = lazy(async()=> {
        const {Edit} = await import(`/@dashboard/visualization/${enginePath}.js`);
        return {default: Edit};
    });

    return <Comp options={config.options} setConfig={setConfig} dataAtoms={dsAtoms}/>;
}

export default DataSourceCommon;