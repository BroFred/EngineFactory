import React, { Suspense } from 'react';
import { dataSourceAtom, visualizationAtom, tokenMaster, layoutAtom, formAtom } from './store';
import { forEach, map, concat } from 'ramda';
import def from '../example/example1.json';
import { RecoilRoot } from 'recoil';
import VizCommon from './VizCommon';
import LayoutCommon from './LayoutCommon';
import FormCommon from './FormCommon';
import { Provider } from 'jotai'
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';

const App = () => {
    const initializeState = ({ set }) => {
        const { dataSource, visualization, tokens, layout, form } = def;
        set(layoutAtom, layout);
        forEach(({ id, value }) => {
            set(tokenMaster(id), { value });
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
    return <Provider><RecoilRoot initializeState={initializeState}
    >
        <Suspense fallback={<></>}>
            <Ds {...{
                id: "my_stream",
                enginePath: "stream",
                options: {
                    "data": [
                        {
                            "a": "C2",
                            "b": 2
                        },
                        {
                            "a": "C7",
                            "b": 7
                        },
                        {
                            "a": "C4",
                            "b": 4
                        },
                        {
                            "a": "D1",
                            "b": 1
                        },
                        {
                            "a": "D2",
                            "b": 2
                        },
                        {
                            "a": "D6",
                            "b": 6
                        },
                        {
                            "a": "E8",
                            "b": 8
                        },
                        {
                            "a": "E4",
                            "b": 4
                        },
                        {
                            "a": "E7",
                            "b": 7
                        }
                    ]
                }
            }} />
        </Suspense>
        <Suspense fallback={<></>}>
            <Viz {...{
                "id": "my_stream_viz",
                "enginePath": "Bypass",
                "options": {
                    "dataSources": [
                        "my_stream"
                    ],
                    "idx": "vega-2",
                    "mark": "bar",
                    "encoding": {
                        "y": {
                            "field": "a",
                            "type": "nominal"
                        },
                        "x": {
                            "aggregate": "average",
                            "field": "b",
                            "type": "quantitative",
                            "axis": {
                                "title": "test vega Stream"
                            }
                        }
                    }
                }
            }} />
            {/* <LayoutCommon>
                {concat(
                    map(({ id }) => {
                        return <Suspense idx={id} fallback={<></>} key={id}><VizCommon id={id} /></Suspense>
                    }, visualization),
                    map(({ id }) => {
                        return <Suspense idx={id} fallback={<></>} key={id}><FormCommon id={id} /></Suspense>
                    }, form)
                )}
            </LayoutCommon> */}
        </Suspense>
    </RecoilRoot></Provider>;
}
export default App;