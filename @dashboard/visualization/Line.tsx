import React from 'react';
import Line from 'root/visxs/components/Line';
import { ParentSize } from '@visx/responsive';
import useDataSources from '@main/tools/useDataSources';

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const other = useDataSources(dataAtoms);
  return (
    <>
      <ParentSize>
        {({ width, height }) => <Line width={width} height={height} data={other} />}
      </ParentSize>
      {/* <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} /> */}
    </>

  );
};

export const config = () => null;
