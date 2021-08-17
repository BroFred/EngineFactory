import React from 'react';
import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
  } from '@visx/xychart';
import { ParentSize } from '@visx/responsive';
import { curveCatmullRomOpen } from '@visx/curve';
import Test from "../visxs/components/Test";
const accessors = {
  xAccessor: (d:any) => d.x,
  yAccessor: (d:any) => d.y,
};

const Line = ({ data, options }) => {
  console.log('line',data,options)
  
  return (
    <ParentSize>
      {({ width, height }) => 
        <XYChart 
          width={width}
          height={height} 
          xScale={{
            type: 'band',
          }} 
          yScale={{ 
            type: 'linear',
          }}>
          <AnimatedAxis orientation="left" numTicks={10} label="value" />
          <AnimatedAxis orientation="bottom" numTicks={10} label="label" />
          <AnimatedLineSeries  dataKey="Line 2" data={data[0]} {...accessors} />
        </XYChart>
      }
    </ParentSize>
    
  )
}

export default Line;