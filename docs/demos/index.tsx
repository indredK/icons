import * as React from 'react';
import AllIconDemo from './AllIcons'
import { useEffect, useState } from 'react';
import localforage from 'localforage'
import { templeName } from './rules/constant';





export default () => {
    const [data, setdata] = useState<any>([]);

    useEffect(() => {

        const init = async () => {
            const data = await localforage.getItem<string[]>(`svgList-${templeName.device}-url`) || []
            const data1 = await localforage.getItem<string[]>(`svgList-${templeName.channel}-url`) || []
            const data2 = await localforage.getItem<string[]>(`svgList-${templeName.location}-url`) || []
            const data3 = await localforage.getItem<string[]>(`svgList-${templeName.system}-url`) || []
            // console.log('%c [ data ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', data)
            setdata([...data, ...data1, ...data2, ...data3])
        }
        init()
    }, [])



    return <AllIconDemo data={data} />
}
