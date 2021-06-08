import React, { Suspense } from 'react';
import { dataSourceAtom, dataSelector, visualizationAtom } from './store';
import { forEach } from 'ramda';
import def from '../example/example1.json';
import { RecoilRoot, useRecoilValue } from 'recoil';
import ShowData from './ShowData';
import Json from './Json';


const App = () => {
    const initializeState = ({ set }) => {
        const { dataSource, visualization } = def;
        forEach(({ id, ...rest }) => {
            set(dataSourceAtom(id), rest);
        }, dataSource);
        forEach(({ id, ...rest }) => {
            set(visualizationAtom(id), rest);
        }, visualization)
    }
    return <RecoilRoot initializeState={initializeState}
    ><Suspense fallback={<></>}>
            <Json id={'my_viz'} />
            <ShowData id={'my_ds'}/>
        </Suspense>
    </RecoilRoot>;
}
export default App;