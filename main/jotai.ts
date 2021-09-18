import { atom } from 'jotai';
import { atomFamily, atomWithReset } from 'jotai/utils';
import {
  map, match, replace, fromPairs, isEmpty, values, any, pair,
} from 'ramda';
import { jVar } from 'json-variables';
import {
  Subject, of, takeUntil, BehaviorSubject,
} from 'rxjs';
import { baseDefinitionProps, variablesItem, baseDefinitionItem } from '@example/definition';
import { isRemoteHost, loadComponent, getRemoteModule } from './utils';

export const definitionAtom = atomWithReset<Record<string, any>>({});

export const variablesAtom = atomFamily(({ id, value }: variablesItem) => {
  const valueAtom = atom({ id, value: value ?? [] });
  return atom(
    (get) => get(valueAtom),
    (get, set, v: string[]) => {
      set(valueAtom, { id, value: v });
    },
  );
}, (a, b) => a.id === b.id);

type atomType = 'dataSources' | 'visualization';

export const atomWithVariable = atomFamily(({
  options, id, enginePath: ep, type,
}: baseDefinitionItem & { type: atomType }) => {
  const def = atom(options);
  const epAtom = atom(ep);
  const stop$ = new Subject();
  const data$ = new BehaviorSubject<any[]>([]);
  data$.subscribe({
    complete: () => console.log('rxjs killed'),
  });
  return atom(
    async (get): Promise<baseDefinitionProps
    & { isWaitingForVariables?: boolean; enginePathRaw: string }> => {
      const enginePath = get(epAtom);
      console.log('start new');
      let fn;
      try {
        fn = (isRemoteHost(enginePath)
          ? await loadComponent('slave', `./${getRemoteModule(enginePath)}`)()
          : await import(`@dashboard/${type}/${enginePath}`)).config;
      } catch (error) {
        fn = () => null;
      }

      const config = get(def);
      const jsonStirng = JSON.stringify(config);
      const reg = /%%_(.*?)_%%/g;
      const result = match(reg, jsonStirng);
      const usedVariables = map((variable) => {
        const tk = replace(/%%_|_%%/g, '', variable).split('.')[0];
        return pair(tk, variablesAtom({ id: tk }));
      }, result);
      const variables = fromPairs(map(([k, v]) => [k, get(v).value], usedVariables));

      const anyIsEmpty = any(isEmpty);
      if (anyIsEmpty(values(variables))) {
        return {
          options: {},
          id,
          enginePath: data$,
          enginePathRaw: enginePath,
          isWaitingForVariables: true,
        };
      }
      const configWithVariable = jVar({
        ...config,
        ...variables,
      });

      const dataTemp$ = await fn(configWithVariable);

      (dataTemp$ || of(0)).pipe(takeUntil(stop$)).subscribe({
        next: (v) => data$.next(v),
      });
      return {
        options: configWithVariable,
        id,
        enginePathRaw: enginePath,
        enginePath: data$,
      };
    },
    (get, set, { enginePath, options }: Record<string, unknown>) => {
      stop$.next(1);
      console.log('stop stream');
      if (enginePath) {
        set(epAtom, enginePath);
      }
      if (options) {
        set(def, options);
      }
    },
  );
}, (a, b) => a.id === b.id);
