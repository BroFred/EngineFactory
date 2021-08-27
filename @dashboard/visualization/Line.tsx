import React, {useEffect, useState} from 'react';
import Line from "root/visxs/components/Line";
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';
import { ParentSize } from '@visx/responsive';
import {map, addIndex, update} from 'ramda';

const mapWithIndex = addIndex(map);
const MultiAtom = ({dataAtom, setData}) => {
  const { enginePath } = useAtomValue(dataAtom);
  const data = useObservableState(enginePath, []);
  useEffect(()=>{
    setData(data);
  },[data])
  return <></>;
}
export const Edit = ({ dataAtoms, options, setConfig }) => {
  
  const [other, setOther] = useState([]);

  return (
    <>
      {
        mapWithIndex((da, index)=><MultiAtom key={index} dataAtom={da} setData={(v)=> {
          other[index] = v;
          setOther(map((v)=>v||[],[...other]))
        }}/>,dataAtoms)
      }
      <ParentSize>
        {({ width, height }) =>
          <Line width={width} height={height} data={other} />
        }
      </ParentSize>
      <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />
    </>

  )
}

export const config = () => {
  return null;
}