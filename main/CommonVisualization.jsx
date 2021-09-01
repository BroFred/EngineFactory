import React, { lazy } from 'react';
import { useAtom } from 'jotai';
import { map } from 'ramda';
import { atomWithVariable, variablesAtom } from './jotai';

const VizCommon = ({ options, enginePath, id }) => {
  const [config, setConfig] = useAtom(atomWithVariable({
    options, enginePath, id, type: 'visualization',
  }));
  if (config.isWaitingForVariables) {
    return <></>;
  }
  const dsAtoms = map((ds) => atomWithVariable({ id: ds }), config.options.dataSources || []);
  const tkAtoms = map((tk) => variablesAtom({ id: tk }), config.options.variables || []);
  const Comp = lazy(async () => {
    const { Edit } = await import(`@dashboard/visualization/${enginePath}`);
    return { default: Edit };
  });

  return <Comp options={config.options} setConfig={setConfig} dataAtoms={dsAtoms} variableAtoms={tkAtoms} />;
};

export default VizCommon;
