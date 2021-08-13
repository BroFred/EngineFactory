import React, { useEffect, lazy, Suspense, createElement } from 'React';
import { visualizationSelector } from './store'
import { useRecoilValue } from 'recoil';
import { empty, is, map, isEmpty } from 'ramda';
const isArray = is(Array);

const VizCommon = ({ id, actions = empty, tokens = [] }) => {
    const { data, enginePath, options } = useRecoilValue(visualizationSelector(id));
    if (!isArray(enginePath)) {
        const Viz = React.lazy(async () => {
            try {
                // this rely on user's build tool visualization should be in user's local folder whose paranet folder has alias of @dashboard
                const module = await import(`@dashboard/visualization/${enginePath}.js`);
                return module
            } catch (error) {
                const module = await import(`/visualization/${enginePath}.js`);
                return module
            }
        });
        return <Viz data={data} options={options} />
    }
    const Comps = map((ep) =>
        React.lazy(async () => {
            try {
                // this rely on user's build tool visualization should be in user's local folder whose paranet folder has alias of @dashboard
                const module = await import(`@dashboard/visualization/${ep}.js`);
                return module
            } catch (error) {
                const module = await import(`/visualization/${ep}.js`);
                return module
            }
        })
        , enginePath);
    const Parent = Comps[0];
    const Child = Comps[1];
    return <Parent data={data} options={options}>
        <Child />
    </Parent>
}

export default VizCommon;