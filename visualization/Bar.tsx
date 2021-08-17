import React from "react";
import Bar from "../visxs/components/Bar";
import { useSetRecoilState } from 'recoil';
import { tokenMaster } from '../main/store'
import { ParentSize } from '@visx/responsive';

const BarChart = ({ data, options }) => {
  console.log('bar', data, options)
  const { target } = options
  const setToken = useSetRecoilState(tokenMaster(target));
  return (
    <ParentSize>
      {({ width, height }) => <Bar width={width} height={height} data={data[0]} onPointerUp={(e)=>{setToken({value:[e.datum.x]})}}></Bar>}
    </ParentSize>
  );
};

export default BarChart