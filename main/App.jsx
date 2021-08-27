import React, { Suspense } from 'react';
import { map } from 'ramda';
import def from '../example/example1.json';
import { Provider } from 'jotai'
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';

const App = () => {
    const { visualization, form, dataSource } = def;
    return <Provider>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {
                map((ds) => <Suspense key={ds.id} fallback={<></>}><Ds {...ds} /></Suspense>, dataSource)
            }
            {
                map((vis) => <div style={{height: 500, width: 500}}><Suspense key={vis.id} fallback={<></>}><Viz {...vis} /></Suspense></div>, visualization)
            }
        </div>
    </Provider>;
}
export default App;