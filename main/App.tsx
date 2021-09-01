import React, { Suspense } from 'react';
import { map } from 'ramda';
import { Provider } from 'jotai';
import { baseDefinitionItem } from '@example/definition';
import def from '../example/example1.json';
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';
import Layout from './CommonLayout';

const App: React.FC<{}> = () => {
  const { visualization, layout, dataSource }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = def;
  return (
    <Provider>
      {
            map(
              (ds) => <Suspense key={ds.id} fallback={<></>}><Ds {...ds} /></Suspense>, dataSource,
            )
        }
      <Suspense fallback={<></>}>
        <Layout {...layout}>
          {
                map(
                  (vis) => (
                    <Suspense key={vis.id} fallback={<></>}>
                      <Viz {...vis} />
                    </Suspense>
                  ), visualization,
                )
            }
        </Layout>
      </Suspense>
    </Provider>
  );
};
export default App;
