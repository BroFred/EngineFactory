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
  options, id, enginePath, type,
}: baseDefinitionItem & { type: atomType }) => {
  const def = atom(options);
  const stop$ = new Subject();
  const data$ = new BehaviorSubject<any[]>([]);
  data$.subscribe({
    complete: () => console.log('rxjs killed'),
  });
  return atom(
    async (get): Promise<baseDefinitionProps
    & { isWaitingForVariables?: boolean; enginePathRaw: string }> => {
      console.log('start new');
      const { config: fn } = await import(`@dashboard/${type}/${enginePath}`);
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

      (fn(configWithVariable) || of(0)).pipe(takeUntil(stop$)).subscribe({
        next: (v) => data$.next(v),
      });
      return {
        options: configWithVariable,
        id,
        enginePathRaw: enginePath,
        enginePath: data$,
      };
    },
    (get, set, v: Record<string, unknown>) => {
      stop$.next(1);
      console.log('stop stream');
      set(def, v);
    },
  );
}, (a, b) => a.id === b.id);
