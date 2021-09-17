import { useMemo } from 'react';
import { combineLatest } from 'rxjs';
import { useObservableState } from 'observable-hooks';
import { waitForAll, useAtomValue } from 'jotai/utils';
import { Atom } from 'jotai';
import { map } from 'ramda';
import { baseDefinitionProps } from '../../../example/definition';

const useDataSources = (dataSources: Atom<baseDefinitionProps>[]) => {
  const data$ = useAtomValue(waitForAll(dataSources));
  const dataMemo$ = useMemo(() => combineLatest(
    map(({ enginePath }) => enginePath, data$),
  ), [data$]);

  const data = useObservableState(
    dataMemo$, [],
  );
  return data;
};

export default useDataSources;
