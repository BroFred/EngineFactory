import React, { useEffect, lazy } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { baseDefinitionItem } from '@example/definition';
import { atomWithVariable, variablesAtom } from './jotai';

const DataSourceCommon: React.FC<baseDefinitionItem> = ({ options, enginePath, id }) => {
  const [config, setConfig] = useAtom(atomWithVariable({
    options, enginePath, id, type: 'dataSources',
  }));
  const setTk = useUpdateAtom(variablesAtom({ id, value: id }));
  const Comp = lazy(async () => {
    const { Edit } = await import(`@dashboard/dataSources/${enginePath}`);
    return { default: Edit };
  });
  useEffect(() => {
    setTk([id]);
    return () => {
      config.enginePath.complete();
      atomWithVariable.remove({ id });
      setTk(['empty_stream']);
      // EXP this leak variable memory which is minimal
    };
  }, []);
  return <Comp options={config.options} setConfig={setConfig} />;
};

export default DataSourceCommon;
