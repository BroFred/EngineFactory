import React, { Suspense, useEffect } from 'react';
import { map } from 'ramda';
import { Provider, atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { baseDefinitionItem } from '@example/definition';
import Show from '@example/showDefinition';
import { definitionAtom } from 'Platform/state';
import def from '../example/example1.json';
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';
import Layout from './CommonLayout';

const defAtom = atom(def);

const DataSources = () => {
  const { dataSource }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = useAtomValue(defAtom);
  return (
    <>
      {
            map(
              (ds) => (
                <Suspense key={ds.id} fallback={<></>}>
                  <Ds key={ds.id} {...ds} />
                </Suspense>
              ), dataSource,
            )
        }
    </>
  );
};

const Visualization = () => {
  const { layout, visualization }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = useAtomValue(defAtom);
  return (
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
  );
};

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
      <DataSources />
      <Visualization />
      <Show />
    </Provider>
  );
};
export default App;
