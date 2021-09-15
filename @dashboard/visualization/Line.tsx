import React, { useMemo } from 'react';
import Line from 'root/visxs/components/Line';
import { useAtomValue, waitForAll } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';
import { ParentSize } from '@visx/responsive';
import { map } from 'ramda';
import { combineLatest } from 'rxjs';

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const data = useAtomValue(waitForAll(dataAtoms));
  const dataMemo$ = useMemo(() => combineLatest(map(({ enginePath }) => enginePath, data)), [data]);

  const other = useObservableState(
    dataMemo$, [],
  );

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
