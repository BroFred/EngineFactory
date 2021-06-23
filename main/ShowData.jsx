import React,{useEffect} from 'React';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {dataSourceAtom, dataSelector, tokenMaster} from './store';
const ShowData = ({id}) => {
    const [data, setData] = useRecoilState(dataSourceAtom(id));
    const setToken = useSetRecoilState(tokenMaster('value2'));
    const setToken1 = useSetRecoilState(tokenMaster('value1'));
    const setTokene = useSetRecoilState(tokenMaster('value'));

    useEffect(()=>{
        // setTimeout(()=>setToken('success'),1000);
        // setTimeout(()=>setData({
        //     "id": "my_ds",
        //     "enginePath": "json",
        //     "options": {
        //         "data": {
        //             "test": "This %%_value1_%% is a  %%_value2_%%"
        //         }
        //     }
        // }),10000);
        // setTimeout(()=>setToken1('test'),20000);
        // setTimeout(()=>{
        //     console.log('?');
        //     setTokene('?');
        // },25000)

    },[])
    const actualData = useRecoilValue(dataSelector(id));
    return <div>{
            JSON.stringify(actualData) 
        }</div>
}

export default ShowData;