import React, { Suspense } from 'react';
import { dataSourceAtom, visualizationAtom, tokenMaster, layoutAtom, formAtom } from './store';
import { forEach, map, concat } from 'ramda';
import def from '../example/example1.json';
import { RecoilRoot } from 'recoil';
import VizCommon from './VizCommon';
import LayoutCommon from './LayoutCommon';
import FormCommon from './FormCommon';
const App = () => {
    const initializeState = ({ set }) => {
        const { dataSource, visualization, tokens, layout, form } = def;
        set(layoutAtom, layout);
        forEach(({ id, value }) => {
            set(tokenMaster(id), {value});
        }, tokens);
        forEach(({ id, ...rest }) => {
            set(dataSourceAtom(id), rest);
        }, dataSource);
        forEach(({ id, ...rest }) => {
            set(formAtom(id), rest);
        }, form);
        forEach(({ id, ...rest }) => {
            set(visualizationAtom(id), rest);
        }, visualization);
    }
    const { visualization, form } = def;
    return <RecoilRoot initializeState={initializeState}
    >
        <Suspense fallback={<></>}>
            <LayoutCommon>
                {concat(
                    map(({ id }) => {
                        return <Suspense idx={id} fallback={<></>} key={id}><VizCommon id={id} /></Suspense>
                    }, visualization),
                    map(({ id }) => {
                        return <Suspense idx={id} fallback={<></>} key={id}><FormCommon id={id} /></Suspense>
                    }, form)
                )}
            </LayoutCommon>
        </Suspense>
    </RecoilRoot>;
}
export default App;