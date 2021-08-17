import React from 'react';
import Line from "../visxs/components/Line";

import { ParentSize } from '@visx/responsive';

const LineChart = ({ data,options }) => {
  const other = options?.other
  let datas = other ?  [ data[0], other] : data
  return (
    <ParentSize>
      {({ width, height }) => 
        <Line width={width} height={height} data={datas}/>
      }
    </ParentSize>
    
  )
}

export default LineChart;