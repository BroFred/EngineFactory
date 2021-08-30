import React, { useState, useEffect, useRef } from "react";
import Pie from "root/visxs/components/Pie";
import { ParentSize } from '@visx/responsive';
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => {
    return null;
}

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const data = useObservableState(enginePath, []);
  const { title } = options
  let originData = []
  if(data.length && title){
    originData = data.find(v=>v.value === title)?.data
  }
  return (
    <>
    <ParentSize>
      {({ width, height }) => <Pie width={width} height={height} data={originData}></Pie>}
    </ParentSize>
    {/* <textarea style={{height: 300}} value={JSON.stringify(options)} onChange={(e)=>setConfig( JSON.parse(e.target.value))}/> */}
    </>
  );
};
