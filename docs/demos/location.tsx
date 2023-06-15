import * as React from 'react';
import AllIconDemo from './AllIcons'
import { useEffect, useState } from 'react';
import localforage from 'localforage'
import { templeName } from './rules/constant';





export default () => {
    const [data, setdata] = useState<any>([]);

    useEffect(() => {

        const init = async () => {
            const data = await localforage.getItem(`svgList-${templeName.location}-url`)
            console.log('%c [ data ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', data)
            setdata(data)
        }
        init()
    }, [])



    return <AllIconDemo data={data} />
}
