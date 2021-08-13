import React, { useEffect, useState, cloneElement } from 'react';

const Stream = ({ data, options, children }) => {
    const [res, setRes] = useState('');
    useEffect(() => {
        try {
            const [results$, cleanUp] = data[0];
            const sub = results$(setRes);
            return () => sub.unsubscribe();
        } catch (error) {
            console.log(error)
        }
        }, [data])
    return <>{
        cloneElement(children,{data:[res], options:options.postStream} )
    }</>
}

export default Stream;