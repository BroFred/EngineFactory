import React, {
  useEffect, lazy, useCallback, useRef,
} from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom, useAtomCallback } from 'jotai/utils';
import { baseDefinitionItem } from '@example/definition';
import { atomWithVariable, variablesAtom, definitionAtom } from './jotai';
import { removeItem as removeDs, addItem as addDs } from './utils';

const DataSourceCommon: React.FC<baseDefinitionItem> = ({ options, enginePath, id }) => {
  const didMountRef = useRef(false);

  const [config, setConfig] = useAtom(atomWithVariable({
    options, enginePath, id, type: 'dataSources',
  }));
  const setTk = useUpdateAtom(variablesAtom({ id, value: id }));
  const Comp = lazy(async () => {
    const { Edit } = await import(`@dashboard/dataSources/${enginePath}`);
    return { default: Edit };
  });
  const upsertDataSource = useAtomCallback(
    useCallback((get, set, v:baseDefinitionItem) => {
      const { dataSource, ...rest } = get(definitionAtom);
      set(definitionAtom, { ...rest, dataSource: addDs(v, removeDs(v.id, dataSource)) });
    }, []),
  );
  const deleteDataSource = useAtomCallback(
    useCallback((get, set, v:baseDefinitionItem) => {
      const { dataSource, ...rest } = get(definitionAtom);
      set(definitionAtom, { ...rest, dataSource: removeDs(v.id, dataSource) });
    }, []),
  );
  useEffect(() => {
    if (didMountRef.current) {
      upsertDataSource(
        { options: config.options, enginePath: config.enginePathRaw, id: config.id },
      );
    }
    didMountRef.current = true;
  }, [config]);
  useEffect(() => {
    setTk([id]);
    return () => {
      config.enginePath.complete();
      atomWithVariable.remove({ id });
      setTk(['empty_stream']);
      deleteDataSource({ options, enginePath, id });
      // EXP this leak variable memory which is minimal
    };
  }, []);
  return <Comp options={config.options} setConfig={setConfig} />;
};

export default DataSourceCommon;
