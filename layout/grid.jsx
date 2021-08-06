import React, { useMemo, forwardRef } from 'react';
import {sortBy, zip , prop, map} from 'ramda';
import GridLayout, {WidthProvider} from 'react-grid-layout';

const Child = forwardRef((props, ref)=>{
  return <div ref={ref} {...props}/> 
})
const RGL = WidthProvider(GridLayout);
const DashboardGrid = ({options, children}) =>{
  const layout = options.structure;
  const childrenWithlayout = useMemo(()=>{
      const childWithLayout = zip(sortBy(prop('key'), children), sortBy(prop('id'), layout));
      return map(([child, layout])=>{
        return (
        <Child key={layout.i} style={{outline: '1px solid black'}}>{child}</Child>
        )
      },childWithLayout)
  },[children,layout]);
  const onLayoutChange = (layout) => console.log(layout)
  return  <RGL layout={layout} cols={12} rowHeight={30} onLayoutChange={onLayoutChange} 
              resizeHandles={['se']} 
              resizeHandle={<span style={{position:'absolute', bottom:0, right:0 }} className="react-resizable-handle react-resizable-handle-se"><div>drag</div></span>}>
      {
        childrenWithlayout
      }
  </RGL>
}

export default DashboardGrid;
