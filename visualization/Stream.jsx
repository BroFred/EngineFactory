import React, { useEffect, useState } from 'react';

const Stream = ({ data, options }) => {
    const [res, setRes] = useState('')
    useEffect(() => {
        try {
            const [results$, cleanUp] = data[0];
            const sub = results$(setRes);
            return () => sub.unsubscribe();
        } catch (error) {
            console.log(error)
        }
        }, [data])
    return <div>{
        JSON.stringify(res)
    }</div>
}

export default Stream;