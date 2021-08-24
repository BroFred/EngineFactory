import React, { useEffect, lazy } from 'React';
import { useAtom } from 'jotai'
import { data, atomWithToken } from './jotai';
import { useUpdateAtom } from 'jotai/utils';
import {takeUntil} from 'rxjs';

const dataDefinition = atomWithToken('dataSources');

const DataSourceCommon = ({ options, enginePath, id }) => {
    const setDef = useUpdateAtom(data(id));
    const [config, setConfig] = useAtom(dataDefinition({ options, enginePath, id }));
    const  Comp  = lazy(async()=> {
        const {Edit} = await import(`/@dashboard/dataSources/${enginePath}.js`);
        return {default: Edit};
    });
    useEffect(()=>{
        const sub = config.enginePath.pipe(takeUntil(config.stop$)).subscribe(setDef);
        return ()=> sub.unsubscribe();
    },[config.enginePath]);
    return <Comp options={config.options} setConfig={setConfig}/>;
}

export default DataSourceCommon;