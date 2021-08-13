import React, { useState, useEffect, useRef } from "react";
import Bar from "../visxs/components/Bar";
import { useSetRecoilState } from 'recoil';
import { tokenMaster } from '../main/store'


const BarChart = ({ data, options }) => {
  console.log('bar', data, options)
  const { target } = options
  
  const setToken = useSetRecoilState(tokenMaster(target));

  return (
    <div>
      <Bar width={500} height={300} data={data[0]} onPointerUp={(e)=>{setToken({value:[e.datum.x]})}}></Bar>
    </div>
  );
};

export default BarChart