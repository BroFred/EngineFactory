import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
const VegaGeneric = ({ data, options }) => {
    useEffect(()=>{
        let datas = JSON.parse ( JSON.stringify(data[0]))
        var vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
              values:datas,
            },
            ...options
          };
        
          // Embed the visualization in the container with id `vis`
          vegaEmbed('#viz-root', vlSpec);
    },[])
    return <div id='viz-root'></div>
}

export default VegaGeneric;