import React, { Suspense } from 'react';
import { map } from 'ramda';
import def from '../example/example1.json';
import { Provider } from 'jotai'
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';
import Layout from './CommonLayout';

const App = () => {
    const { visualization, layout, dataSource } = def;
    return <Provider>
                 {
                    map((ds) => <Suspense key={ds.id} fallback={<></>}><Ds {...ds} /></Suspense>, dataSource)
                }
        <Suspense fallback={<></>}>
            <Layout {...layout}>
                {
                    map((vis) => <Suspense key={vis.id} fallback={<></>}><Viz {...vis} /></Suspense>, visualization)
                }
            </Layout>
        </Suspense>
    </Provider>;
}
export default App;