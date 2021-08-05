import React, { Suspense } from 'react';
import { dataSourceAtom, visualizationAtom, tokenMaster, layoutAtom } from './store';
import { forEach, map } from 'ramda';
import def from '../example/example1.json';
import { RecoilRoot } from 'recoil';
import VizCommon from './VizCommon';
import LayoutCommon from './LayoutCommon';
const App = () => {
    const initializeState = ({ set }) => {
        const { dataSource, visualization, tokens, layout } = def;
        set(layoutAtom, layout);
        forEach(({ id, value }) => {
            set(tokenMaster(id), value);
        }, tokens);
        forEach(({ id, ...rest }) => {
            set(dataSourceAtom(id), rest);
        }, dataSource);
        forEach(({ id, ...rest }) => {
            set(visualizationAtom(id), rest);
        }, visualization);
    }
    const { visualization } = def;
    return <RecoilRoot initializeState={initializeState}
    >
        <Suspense fallback={<></>}>
            <LayoutCommon>
                {
                    map(({ id }) => {
                        return <Suspense idx={id} fallback={<></>} key={id}><VizCommon id={id} /></Suspense>
                    }, visualization)
                }
            </LayoutCommon>
        </Suspense>
    </RecoilRoot>;
}
export default App;