import { atomFamily, selectorFamily, atom } from 'recoil';
import { jVar } from "json-variables";
import { fromPairs, map, match, replace, values, all, isEmpty } from 'ramda';
import { Subject, takeWhile, BehaviorSubject, takeUntil, isObservable, tap } from 'rxjs';
export const stop$ = new Subject();

export const dataSourceAtom = atomFamily(
    {
        key: 'dataSource',
        default: {}
    }
);

export const visualizationAtom = atomFamily(
    {
        key: 'visualization',
        default: {},
    }
);

export const layoutAtom = atom(
    {
        key: 'layout',
        default: {},
    }
);

export const formAtom = atomFamily(
    {
        key: 'form',
        default: {},
    }
);


export const tokenMaster = atomFamily(
    {
        key: 'tokenMaster',
        default: {value: ""},
    }
);

export const tokenAtom = selectorFamily(
    {
        key: 'token',
        get: (id) => ({ get }) => {
            const dataSource = get(dataSourceAtom(id));
            const visualization = get(visualizationAtom(id));
            const jsonStirng = JSON.stringify({
                ...dataSource,
                ...visualization,
            });
            const reg = /\%\%\_(.*?)\_\%\%/g;
            const result = match(reg, jsonStirng);
            //effect clean up previous sub when token or dataSource def Changes
            if(!isEmpty(result) && !isEmpty(dataSource)){
                stop$.next(id);
            }
            const tokens = map((token) => {
                const tk = replace(/\%\%\_|\_\%\%/g, '', token).split('.')[0];
                return [tk, get(tokenMaster(tk)).value];
            }, result);
            return fromPairs(tokens);
        }
    }
);

const anyIsEmpty = (tokens)=> !all((v)=>v, values(map((tk)=>!!tk.length, tokens)));
export const dataSelector = selectorFamily({
    key: 'data',
    get: (id) => async ({ get }) => {
        const config = get(dataSourceAtom(id));
        const tokens = get(tokenAtom(id));
        if(anyIsEmpty(tokens)){
            return [];
        }
        const configWithToken = jVar({
            ...config,
            ...tokens,
        });
        const { enginePath, options } = configWithToken;

        let module;
        try {
            // this rely on user's build tool dataSources should be in user's local folder whose paranet folder has alias of @dashboard
            module =  await import(`@dashboard/dataSources/${enginePath}.js`);
        } catch (error) {
            module =  await import(`/dataSources/${enginePath}.js`);
        }
        const { default: dataSourceEngine } = module;
        const data = await dataSourceEngine(options);
        if(isObservable(data)){
            const results$ = new BehaviorSubject([]);
            const src$ = data.pipe(
                takeUntil(stop$.pipe(
                    takeWhile(idx=> {
                        return idx===id;
                    })
                ))
            );
            src$.subscribe(results$)
            return (fn) => results$.subscribe(fn);
        }

        return data;
    },
});

export const visualizationSelector = selectorFamily({
    key: 'viz',
    get: (id) => async ({ get }) => {
        const config = get(visualizationAtom(id));
        const tokens = get(tokenAtom(id));
        if(anyIsEmpty(tokens)){
            return { data:[[]], options:{}, enginePath:config.enginePath };
        }
        const configWithToken = jVar({
            ...config,
            ...tokens,
        });
        const { enginePath, options } = configWithToken;
        const data = map((dataSourceId) => get(dataSelector(dataSourceId)), options.dataSources);
        return { data, options, enginePath };

    },
});

export const formSelector = selectorFamily({
    key: 'formSelector',
    get: (id) => async ({ get }) => {
        const config = get(formAtom(id));
        const tokens = get(tokenAtom(id));
        const configWithToken = jVar({
            ...config,
            ...tokens,
        });
        const { options, enginePath } = configWithToken;
        const data = get(dataSelector(options.dataSources));
        return { data, options, enginePath };

    },
});







