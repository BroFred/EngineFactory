import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai/utils';

export const config = () => {
    return {};
}

// export const Edit =  ({dataAtoms}) =>{
//     const data = useAtomValue(dataAtoms[0]);
//     return <div>{JSON.stringify(data)}</div>;
// }


const debounce = (ms, fn) => {
    let timer;
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { fn(...args) }, ms);
    }
}
export const Edit = ({ dataAtoms, options = { idx: 123 } }) => {
    const data = useAtomValue(dataAtoms[0]);
    const ref = useRef();
    const [{ width, height }, setDim] = useState({ width: '', height: '' });
    const debounceSetDim = debounce(200, setDim);
    const resizeObserver = new ResizeObserver(() => {
        debounceSetDim({
            width: ref.current.parentNode.clientWidth * 0.8,
            height: ref.current.parentNode.clientHeight * 0.8
        })
    });

    useEffect(() => {
        if (ref.current) {
            resizeObserver.observe(ref.current.parentNode);
        }
        return () => resizeObserver.disconnect();
    }, [ref])
    useEffect(() => {
        let datas = JSON.parse(JSON.stringify(data || {}))
        if (datas.length) {
            var vlSpec = {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                data: {
                    values: datas,
                },
                width, height,
                ...options
            };
            // Embed the visualization in the container with id `vis`

            const res = vegaEmbed(`#${options.idx}`, vlSpec);
            return () => res.then(({ finalize }) => finalize())
        }
    }, [width, height, data])
    return <div id={`${options.idx}`} ref={ref} ></div>
}
