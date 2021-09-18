import React, { Suspense, useEffect } from 'react';
import { map } from 'ramda';
import { Provider } from 'jotai';
import { baseDefinitionItem } from '@example/definition';
import Show from '@example/showDefinition';
import { definitionAtom } from 'Platform/state';
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
    <Provider
      initialValues={[[definitionAtom, { visualization, layout, dataSource }]]}
    >
      {
            map(
              (ds) => (
                <Suspense key={ds.id} fallback={<></>}>
                  <Ds key={ds.id} {...ds} />
                </Suspense>
              ), dataSource,
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
      <Show />
    </Provider>
  );
};
export default App;
