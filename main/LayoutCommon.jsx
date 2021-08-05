import React from 'React';
import { layoutAtom } from './store'
import {useRecoilValue} from 'recoil';
const LayoutCommon = (props) => {
    const {enginePath, options} = useRecoilValue(layoutAtom);
    const Layout = React.lazy(() => import(`/layout/${enginePath}.js`));
    return <Layout options={options} {...props}/>
}

export default LayoutCommon;