import * as React from 'react';
import pako from 'pako';



const useSdk = () => {
    const [MODEL, setMODEL] = React.useState<string[]>([])
    const [MetricList, setMetricList] = React.useState<string[]>([])

    React.useEffect(() => {

        const url = "http://192.168.5.124:14873/-/verdaccio/data/sidebar/@ursalink-cloud/core-sdk"
        fetch(url,).then(e => {
            return e.json()
        }).then(e => {
            // 获取最新版本的版本号
            const { latest } = e["dist-tags"]
            return latest
        }).then(lasest => {
            // 拼接tgz的下载地址
            const url = `http://192.168.5.124:14873/@ursalink-cloud%2fcore-sdk/-/core-sdk-${lasest}.tgz`;
            fetch(url,)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.arrayBuffer();
                })
                .then(blob => {
                    const inflated = pako.inflate(blob);
                    const data = new TextDecoder().decode(inflated)
                    // 匹配以 export declare enum MODEL { 开头，}结尾的内容
                    const pattern_MODEL = /export declare enum MODEL {([\s\S]*?)^\}/m
                    const pattern_SENSOR_CHANNEL_TYPE = /export declare enum SENSOR_CHANNEL_TYPE {([\s\S]*?)^\}/m

                    // 从字符串中提取匹配结果
                    const match_MODEL = data.match(pattern_MODEL)
                    const match_SENSOR_CHANNEL_TYPE = data.match(pattern_SENSOR_CHANNEL_TYPE)

                    {
                        const lines = match_MODEL![1].trim().split('\n')
                        const pattern1 = /"([^"]*)"/
                        // 从每个字符串中提取双引号内容，并返回新数组
                        const result = lines.map(str => str.match(pattern1)![1])
                        // 输出结果数组
                        // console.log(result)

                        // 使用 Set 数据结构进行去重操作，然后去掉默认-
                        const uniqueSet = new Set(result.filter((item) => item !== "-"));
                        // 将 Set 转换为数组，并筛选出所有的真值元素
                        const MODEL = Array.from(uniqueSet).filter(Boolean);
                        setMODEL(MODEL)
                    }
                    {
                        const lines = match_SENSOR_CHANNEL_TYPE![1].trim().split('\n')
                        const pattern1 = /"([^"]*)"/
                        // 从每个字符串中提取双引号内容，并返回新数组
                        const result = lines.map(str => str.match(pattern1)![1])
                        // 输出结果数组
                        // console.log(result)

                        // 使用 Set 数据结构进行去重操作，然后去掉默认-
                        const uniqueSet = new Set(result.filter((item) => item !== "-"));
                        // 将 Set 转换为数组，并筛选出所有的真值元素
                        const MetricList = Array.from(uniqueSet).filter(Boolean);
                        setMetricList(MetricList)
                    }

                })
        }).catch(e => {
            console.log('%c [ e ]-71', 'font-size:13px; background:pink; color:#bf2c9f;', e)
            setMODEL(["-"])
            setMetricList(["-"])
        })




    }, [])


    return [MODEL, MetricList]

}



export { useSdk }