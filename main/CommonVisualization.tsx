import React, {
  lazy, useCallback, useEffect, useRef,
} from 'react';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { map } from 'ramda';
import { baseDefinitionItem } from '@example/definition';
import { atomWithVariable, variablesAtom, definitionAtom } from 'Platform/state';
import {
  removeItem as removeViz, addItem as addViz, isRemoteHost, loadComponent, getRemoteModule,
} from './utils';

// fallback Viz here, you can specify fallbackEnginePath to declare fallback comp
class Edit extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const Comp = lazy(async () => {
      const { Edit: Cp } = (isRemoteHost(this.props.enginePath)
        ? await loadComponent('slave', `./${getRemoteModule(this.props.enginePath)}`)()
        : await import(`@dashboard/visualization/${this.props.enginePath}`));
      return { default: Cp };
    });

    const Fallback = lazy(async () => {
      const { Edit: Cp } = await import(`@dashboard/visualization/${this.props.fallbackEnginePath}`);
      return { default: Cp };
    });

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Fallback {...this.props} />;
    }
    return <Comp {...this.props} />;
  }
}

const VizCommon = ({
  options, enginePath, id, fallbackEnginePath,
}:baseDefinitionItem):JSX.Element => {
  console.log('called');
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

  return (
    <Edit
      enginePath={config.enginePathRaw}
      fallbackEnginePath={fallbackEnginePath}
      options={config.options}
      setConfig={(options, enginePath) => setConfig({ options, enginePath })}
      dataAtoms={dsAtoms}
      variableAtoms={tkAtoms}
    />
  );
};

export default VizCommon;
