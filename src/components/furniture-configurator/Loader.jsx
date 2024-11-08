import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'

const Loader = () => {
    const [data, setData] = useState([1, 2, 3]);
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => [...prevData, ""]);
        }, 900);
        return () => clearInterval(interval);
    }, []);
    return (
        data.map((_, index) => (
            <Skeleton.Input className='mb-3' key={index} active={true} size={"large"} block={"default"} />
        ))
    )
}

export default Loader