import { atomFamily, selectorFamily } from 'recoil';
import { jVar } from "json-variables";
import {fromPairs, map, match, replace} from 'ramda';



export const dataSourceAtom = atomFamily(
    {
        key: 'dataSource',
        default: {},
    }
);

export const visualizationAtom = atomFamily(
    {
        key: 'visualization',
        default: {},
    }
);

export const layoutAtom = atomFamily(
    {
        key: 'layout',
        default: {},
    }
);


export const tokenMaster = atomFamily(
    {
        key: 'tokenMaster',
        default: "",
    }
);

export const tokenAtom = selectorFamily(
    {
        key: 'token',
        get: (id) => ({get}) => {
            const dataSource = get(dataSourceAtom(id));
            const visualization = get(visualizationAtom(id));
            const layout = get(layoutAtom(id));
            const jsonStirng = JSON.stringify({
                ...dataSource,
                ...visualization,
                ...layout
            });
            const reg =  /\%\%\_(.*?)\_\%\%/g;
            const result = match(reg, jsonStirng);
            const tokens = map((token)=>{
                const tk = replace(/\%\%\_|\_\%\%/g, '', token);
                return [tk, get(tokenMaster(tk))];
            }, result);
            return fromPairs(tokens);
        }
    }
);

export const dataSelector = selectorFamily({
    key: 'data',
    get: (id) => async ({ get }) => {
        const config = get(dataSourceAtom(id));
        const tokens = get(tokenAtom(id));
        const configWithToken = jVar({
            ...config,
            ...tokens,
        });
        const { enginePath, options } =  configWithToken;

        const {default: dataSourceEngine} = await import(`/dataSources/${enginePath}.js`);
        const data = await dataSourceEngine(options); 
        return data;
    },
});

export const visualizationSelector =  selectorFamily({
    key: 'viz',
    get: (id) => async ({ get }) => {
        const config = get(visualizationAtom(id));
        const tokens = get(tokenAtom(id));
        const configWithToken = jVar({
            ...config,
            ...tokens,
        });
        const { enginePath, options } =  configWithToken;
        const data = map((dataSourceId)=>get(dataSelector(dataSourceId)), options.dataSources);
        return {data, options, enginePath}; 
        
    },
});







