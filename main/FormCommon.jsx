import React from 'React';
import { formSelector } from './store'
import {useRecoilValue} from 'recoil';
const FormCommon = ({id, ...props}) => {
    const {enginePath, options, data} = useRecoilValue(formSelector(id));

    const Layout = React.lazy(() => import(`/form/${enginePath}.js`));
    return <Layout options={options} data={data} {...props}/>
}

export default FormCommon;