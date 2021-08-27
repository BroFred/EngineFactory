import React, { useEffect, lazy } from 'react';
import { useAtom } from 'jotai'
import { atomWithToken, tokensAtom } from './jotai';
import { useUpdateAtom } from 'jotai/utils';

const DataSourceCommon = ({ options, enginePath, id }) => {
    const [config, setConfig] = useAtom(atomWithToken({ options, enginePath, id, type: 'dataSources' }));
    const setTk = useUpdateAtom(tokensAtom({ id, value: id }));
    const Comp = lazy(async () => {
        const { Edit } = await import(`@dashboard/dataSources/${enginePath}`);
        return { default: Edit };
    });
    useEffect(() => {
        setTk(id)
        return () => {
            config.enginePath.complete();
            atomWithToken.remove({ id });
            setTk('empty_stream');
            // EXP this leak token memory which is minimal
        }
    }, [])
    return <Comp options={config.options} setConfig={setConfig} />;
}

export default DataSourceCommon;