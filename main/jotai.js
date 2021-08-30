import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils';
import { map, match, replace, fromPairs, isEmpty, values, any } from 'ramda';
import { jVar } from "json-variables";
import { Subject, of, takeUntil, BehaviorSubject } from 'rxjs';

export const tokensAtom = atomFamily(({ id, value }) => {
    const valueAtom = atom({ id, value: value = [] });
    return atom(
        (get) => get(valueAtom),
        (get, set, v) => {
            set(valueAtom, { id, value: v });
        }
    )
}, (a, b) => a.id === b.id);

export const atomWithToken = atomFamily(({ options, id, enginePath, type }) => {
    const def = atom(options);
    const stop$ = new Subject();
    const data$ = new BehaviorSubject();
    data$.subscribe({
        complete: () => console.log('rxjs killed')
    })
    return atom(
        async get => {
            console.log('start new')
            const { config: fn } = await import(`@dashboard/${type}/${enginePath}`);
            const config = get(def);
            const jsonStirng = JSON.stringify(config);
            const reg = /\%\%\_(.*?)\_\%\%/g;
            const result = match(reg, jsonStirng);
            const usedTokens = map((token) => {
                const tk = replace(/\%\%\_|\_\%\%/g, '', token).split('.')[0];
                return [tk, tokensAtom({ id: tk })]
            }, result);
            const tokens = fromPairs(map(([k, v]) => [k, get(v).value], usedTokens));

            const anyIsEmpty = any(isEmpty)
            if (anyIsEmpty(values(tokens))) {
                return { 
                    options: {},
                    id, enginePath: of([]),
                    isWaitingForTokens: true 
                }
            }
            const configWithToken = jVar({
                ...config,
                ...tokens,
            });


            (fn(configWithToken) || of(0)).pipe(takeUntil(stop$)).subscribe({
                next: (v) => data$.next(v)
            })
            return {
                options: configWithToken,
                id, enginePath: data$,
            };
        },
        (get, set, v) => {
            stop$.next(1);
            console.log('stop stream');
            set(def, v);
        }
    )

}, (a, b) => a.id === b.id);




