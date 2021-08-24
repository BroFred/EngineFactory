import React from 'react';
import { useAtomValue } from 'jotai/utils';
import {data } from '../../main/jotai';

const Show =  ({}) =>{
    const data1 = useAtomValue(data('my_stream')); 
    return <>{JSON.stringify(data1)}</>;
}
export default Show;