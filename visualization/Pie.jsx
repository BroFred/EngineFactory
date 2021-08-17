import React, { useState, useEffect, useRef } from "react";
import Pie from "../visxs/components/Pie";
import { ParentSize } from '@visx/responsive';


const PieChart = ({ data, options }) => {
  console.log('pie',data,options)
  const { title } = options
  let originData = []
  if(data.length && title){
    originData = data[0].find(v=>v.value === title)?.data
  }
  console.log('originData',originData)
  return (
    <ParentSize>
      {({ width, height }) => <Pie width={width} height={height} data={originData}></Pie>}
    </ParentSize>
  );
};

export default PieChart