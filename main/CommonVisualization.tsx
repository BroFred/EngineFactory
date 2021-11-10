import React, {
  lazy, useCallback, useEffect, useRef, memo, Suspense,
} from 'react';
import { useAtom } from 'jotai';
import { useAtomCallback, useAtomValue } from 'jotai/utils';
import { map, equals } from 'ramda';
import { baseDefinitionItem } from '@example/definition';
import {
  atomWithVariable, variablesAtom, definitionAtom, remoteRepo,
} from 'Platform/state';
import { Button } from '@chakra-ui/react';
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

  shouldComponentUpdate(pre, next) {
    return equals(pre, next);
  }

  render() {
    const Comp = lazy(async () => {
      let Cp;
      if (isRemoteHost(this.props.enginePath)) {
        const { name, module, url } = getRemoteModule(this.props.enginePath);
        Cp = await loadComponent(url)(name, `./${module}`);
      } else {
        Cp = await import(`@dashboard/visualization/${this.props.enginePath}`);
      }
      return { default: Cp.Edit };
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

const Comp = Edit;

const VizCommon = ({
  vizAtom, onRemove,
}):JSX.Element => {
  const {
    options, enginePath, id, fallbackEnginePath,
  } = vizAtom;
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
    console.log('unmount', `${vizAtom.id}`);
    // deleteVisualization({ options, enginePath, id });
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
    <Suspense fallback={<></>}>
      <Button onClick={onRemove}>
        {`${vizAtom.id}`}
        {' '}
      </Button>
      <Comp
        enginePath={config.enginePathRaw}
        fallbackEnginePath={fallbackEnginePath}
        options={config.options}
        setConfig={(options, enginePath) => setConfig({ options, enginePath })}
        dataAtoms={dsAtoms}
        variableAtoms={tkAtoms}
      />
    </Suspense>
  );
};

export default VizCommon;
