import React from "react";
import Bar from "root/visxs/components/Bar";
import { ParentSize } from '@visx/responsive';
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => {
  return null;
}

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const data = useObservableState(enginePath, []);

  const { target } = options
  return (
    <>
      <ParentSize>
        {({ width, height }) => <Bar width={width} height={height} data={data}></Bar>}
      </ParentSize>
      <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />
    </>
  );
};
