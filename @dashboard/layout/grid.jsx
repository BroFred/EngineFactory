import React, {
  useMemo, forwardRef, memo, useEffect,
} from 'react';
import {
  sortBy, zip, prop, map, pluck, without, filter,
} from 'ramda';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { LayoutAtom } from 'Platform/state';
import { useAtom } from 'jotai';

const Child = forwardRef((props, ref) => <div ref={ref} {...props} />);
const RGL = WidthProvider(GridLayout);
const DashboardGrid = ({ options, children }) => {
  const [layoutRaw, setLayoutRaw] = useAtom(LayoutAtom);
  const layout = layoutRaw.options.structure;
  const onLayoutChange = (l) => {
    setLayoutRaw({
      ...layoutRaw,
      options: {
        structure: l,
      },
    });
  };
  return (
    <RGL
      measureBeforeMount
      layout={layout}
      cols={12}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      resizeHandles={['se']}
      resizeHandle={<span style={{ position: 'absolute', bottom: 0, right: 0 }} className="react-resizable-handle react-resizable-handle-se"><div>drag</div></span>}
    >
      {
        map((child) => (
          <Child key={child.key} style={{ outline: '1px solid black', overflow: 'auto' }}>{child}</Child>
        ), children)
      }
    </RGL>
  );
};

export default DashboardGrid;
