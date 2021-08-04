import React, {useEffect, lazy, Suspense} from 'React';
import { visualizationSelector } from './store'
import {useRecoilValue} from 'recoil';
import {empty} from 'ramda';
const VizCommon = ({ id, actions=empty, tokens=[] }) => {
    const {data, enginePath, options} = useRecoilValue(visualizationSelector(id));
    const Viz = React.lazy(() => import(`/visualization/${enginePath}.js`));
    return <Viz data={data} options={options}/>
}

export default VizCommon;