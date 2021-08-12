import React, { useEffect, useRef, useState } from 'react';

const debounce = (ms , fn) => {
  let timer;
  return (...args)=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{fn(...args)},ms); 
  }
}
const VegaGeneric = ({ data, options }) => {
  const ref = useRef();
  const [{width, height}, setDim] = useState({width:'', height:''});
  const debounceSetDim = debounce(200, setDim);
  useEffect(()=>{
    if(ref.current){
      const resizeObserver = new ResizeObserver(() => {
        debounceSetDim({
          width: ref.current.parentNode.clientWidth*0.8,
          height: ref.current.parentNode.clientHeight*0.8
        })
      });
      resizeObserver.observe(ref.current.parentNode);
    }
  },[ref])
    useEffect(()=>{
        let datas = JSON.parse ( JSON.stringify(data[0]))
        var vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
            data: {
              values:datas,
            },
            width, height,
            ...options
          };
        
          // Embed the visualization in the container with id `vis`
          vegaEmbed('#viz-root', vlSpec);
    },[width, height])
    return <div id='viz-root' ref={ref} ></div>
}

export default VegaGeneric;