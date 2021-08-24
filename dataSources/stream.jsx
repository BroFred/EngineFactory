import { interval, scan } from "rxjs";
import React from 'react';

const stream = async ({data}) => {
    const source = interval(1000).pipe(scan((acc, curr) => data[curr] ? [...acc, data[curr]] : acc, []));
    return source;
}

export const config = ({data}) => {
    const source = interval(1000).pipe(scan((acc, curr) => data[curr] ? [...acc, data[curr]] : acc, []));
    return source;
}

export const Edit = ({options, setConfig}) =>{
    return <textareainput value={JSON.stringify(options)} onChange={(e)=>setConfig( JSON.parse(e.target.value))}/>
}
export default stream;

