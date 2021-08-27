import React from 'react';
import Line from "root/visxs/components/Line";
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';
import { ParentSize } from '@visx/responsive';

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const data = useObservableState(enginePath, []);
  const other = options?.other ?? []

  let datas = other ? [data || [], other] : (data || [])
  return (
    <>
      <ParentSize>
        {({ width, height }) =>
          <Line width={width} height={height} data={datas} />
        }
      </ParentSize>
      <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />
    </>

  )
}

export const config = () => {
  return null;
}