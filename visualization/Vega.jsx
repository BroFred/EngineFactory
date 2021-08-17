import React, { useEffect, useRef, useState } from 'react';

const debounce = (ms , fn) => {
  let timer;
  return (...args)=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{fn(...args)},ms); 
  }
}
const VegaGeneric = ({ data, options={idx:123} }) => {
  const ref = useRef();
  const [{width, height}, setDim] = useState({width:'', height:''});
  const debounceSetDim = debounce(200, setDim);
  const resizeObserver = new ResizeObserver(() => {
    debounceSetDim({
      width: ref.current.parentNode.clientWidth*0.8,
      height: ref.current.parentNode.clientHeight*0.8
    })
  });

  useEffect(()=>{
    if(ref.current){
      resizeObserver.observe(ref.current.parentNode);
    }
    return ()=> resizeObserver.disconnect();
  },[ref])
    useEffect(()=>{
        let datas = JSON.parse ( JSON.stringify(data[0]||{}))
        if(datas.length){
          var vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
              values:datas,
            },
            width, height,
            ...options
          };
          // Embed the visualization in the container with id `vis`
          
          const res = vegaEmbed(`#${options.idx}`, vlSpec);
          return ()=> res.then(({finalize})=>finalize())
        }
    },[width, height, data])
    return <div id={`${options.idx}`} ref={ref} ></div>
}

export default VegaGeneric;