import React, {
  lazy, useCallback, useEffect, useRef,
} from 'react';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { map } from 'ramda';
import { baseDefinitionItem } from '@example/definition';
import { removeItem as removeViz, addItem as addViz } from './utils';
import { atomWithVariable, variablesAtom, definitionAtom } from './jotai';

const VizCommon = ({ options, enginePath, id }:baseDefinitionItem):JSX.Element => {
  const didMountRef = useRef(false);
  const [config, setConfig] = useAtom(atomWithVariable({
    options, enginePath, id, type: 'visualization',
  }));
  const upsertVisualization = useAtomCallback(
    useCallback((get, set, v:baseDefinitionItem) => {
      const { visualization, ...rest } = get(definitionAtom);
      set(definitionAtom, { ...rest, visualization: addViz(v, removeViz(v.id, visualization)) });
    }, []),
  );
  const deleteVisualization = useAtomCallback(
    useCallback((get, set, v:baseDefinitionItem) => {
      const { dataSource, ...rest } = get(definitionAtom);
      set(definitionAtom, { ...rest, visualization: removeViz(v.id, dataSource) });
    }, []),
  );
  useEffect(() => {
    if (didMountRef.current) {
      upsertVisualization(
        { options: config.options, enginePath: config.enginePathRaw, id: config.id },
      );
    }
    didMountRef.current = true;
  }, [config]);
  useEffect(() => () => {
    deleteVisualization({ options, enginePath, id });
  }, []);
  if (config.isWaitingForVariables) {
    return <></>;
  }
  const dsAtoms = map(
    (ds) => atomWithVariable({ id: ds }),
    config.options.dataSources || [],
  );
  const tkAtoms = map((tk) => variablesAtom({ id: tk }), config.options.variables || []);
  const Comp = lazy(async () => {
    const { Edit } = await import(`@dashboard/visualization/${enginePath}`);
    return { default: Edit };
  });

  return (
    <Comp
      options={config.options}
      setConfig={setConfig}
      dataAtoms={dsAtoms}
      variableAtoms={tkAtoms}
    />
  );
};

export default VizCommon;
