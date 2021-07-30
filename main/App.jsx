import React, { Suspense } from 'react';
import { dataSourceAtom, dataSelector, visualizationAtom, tokenMaster } from './store';
import { forEach } from 'ramda';
import def from '../example/example1.json';
import { RecoilRoot, useRecoilValue } from 'recoil';
import ShowData from './ShowData';
import VizCommon from './VizCommon';
import Layout from '../layout/grid';

const App = () => {
    const initializeState = ({ set }) => {
        const { dataSource, visualization, tokens } = def;
        forEach(({ id, ...rest }) => {
            set(dataSourceAtom(id), rest);
        }, dataSource);
        forEach(({ id, ...rest }) => {
            set(visualizationAtom(id), rest);
        }, visualization);
        forEach(({ id, value }) => {
            set(tokenMaster(id), value);
        }, tokens)
    }
    return <RecoilRoot initializeState={initializeState}
    >
        <Layout>
            <Suspense idx={'my_viz'} fallback={<></>}><VizCommon id={'my_viz'} /></Suspense>
            <Suspense idx={'my_viz_rest'} fallback={<></>}><VizCommon id={'my_viz_rest'} /></Suspense>
            <Suspense idx={'my_ds'} fallback={<></>}><ShowData id={'my_ds'} /></Suspense>
            <Suspense idx={'my_vega'} fallback={<></>}><VizCommon id={'my_vega'} /></Suspense>
        </Layout>
    </RecoilRoot>;
}
export default App;