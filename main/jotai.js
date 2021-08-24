import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils';
import { map, match, replace} from 'ramda';
import { jVar } from "json-variables";
import {Subject} from 'rxjs';

export const tokensAtom = atomFamily(({ id, value }) => {
    const valueAtom = atom({ id, value });
    return atom(
        (get) => get(valueAtom),
        (get, set, v) => {
            set(value, { id, value: v });
        }
    )
}, (a, b) => a.id === b.id);

export const atomWithToken = (type='dataSources')=> atomFamily(({ options, id, enginePath }) => {
    const def = atom(options);
    const stop$ = new Subject();
    def.onMount = ()=> ()=>stop$.next(1);
    return atom(
       async get => {
            const {config: fn} = await import(`/@dashboard/${type}/${enginePath}.js`);
            const config = get(def);
            const jsonStirng = JSON.stringify(config);
            const reg = /\%\%\_(.*?)\_\%\%/g;
            const result = match(reg, jsonStirng);
            const usedTokens = map((token) => {
                const tk = replace(/\%\%\_|\_\%\%/g, '', token).split('.')[0];
                return [tk, tokensAtom({ id: tk })]
            }, result);
            const tokens = map(([k, v]) => [k, get(v)], usedTokens);

            const configWithToken = jVar({
                ...config,
                ...tokens,
            });
            console.log('start new')
            return {
                options: configWithToken,
                id, enginePath: fn(configWithToken), stop$
            };
        },
        (get, set, v) => {
            console.log('stop stream');
            stop$.next(1);
            set(def, v);
        }
    )

}, (a, b) => a.id === b.id);

export const data = atomFamily((id)=>{
    const d = atom([]);
    return atom(
        get => get(d),
        (get, set, v) => set(d, v)
    );
});



