import React from 'React';
import { visualizationSelector } from './store'
import {useRecoilValue} from 'recoil';
const ShowJson = ({ id }) => {
    const {data} = useRecoilValue(visualizationSelector(id));
    return <div>{
        JSON.stringify(data)
    }</div>
}

export default ShowJson;