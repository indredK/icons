import { Button, Col, Form, Input, Row, Image, message, Divider, Spin, Skeleton } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
// import * as AntdIcons from '../../packages/icons-react/src/icons';

import localforage from 'localforage'
import { getString, getString_web, getSvgList } from '../../xzUtils/utils';
import AllIcons, { extractIdFromSvgString } from './AllIcons'
import { produce } from "immer";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { C_oldUrl, D_oldUrl, L_oldUrl, S_oldUrl, templeName } from './rules/constant';
import { useSdk } from './rules/hook';
import { Crule, Lrule, Srule, isDrule } from './rules/rule';
interface DataType {
    key: number;
    diff: string;
    num1: string;
    num2: string;
}


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
};

const tailLayout = { wrapperCol: { offset: 0, span: 16 }, };



const columns: ColumnsType<DataType> = [
    {
        title: '对比项',
        dataIndex: 'diff',
        key: 'diff',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'npm已发布最新版',
        dataIndex: 'num1',
        key: 'age',
    },
    {
        title: '当前版本',
        dataIndex: 'num2',
        key: 'address',
    },
];


// 拿到数据列表
const reGetSvg = async (opt: { url: string | null; }) => {
    const { url } = opt
    if (!url) { return [] }
    const stringList = await getString_web(url)
    const svglist = getSvgList(stringList)
    return svglist
}

const App: React.FC = () => {
    const [form] = Form.useForm();
    const [sumitloading, setsumitloading] = useState<boolean>(false)
    const [Resetloading, setResetloading] = useState<boolean>(false)

    const [MODEL, MetricList] = useSdk()

    /** 存数据 */
    const [data, setdata] = useState<any>({});

    const onFinish = (values: any) => {
        console.log(values);
        setsumitloading(true)
        setTimeout(async () => {
            for (const item of Object.keys(values)) {
                if (values[item]) {
                    await localforage.setItem(`${item}-url`, values[item]);
                    const svglist = await reGetSvg({ url: values[item], });
                    await localforage.setItem(`svgList-${item}-url`, svglist || [])
                    setdata(produce((draft: any) => {
                        draft[item].value = svglist || []
                        draft[item].url = values[item]
                    }))
                }
            }
            setsumitloading(false)
            message.info("读取成功")
        }, 0);
    };

    const onReset = () => {
        setResetloading(true)
        setTimeout(async () => {
            for (const item of Object.keys(data)) {
                const res = await localforage.getItem(`svgList-${item}-oldUrl`);
                await localforage.setItem(`${item}-url`, data[item].oldUrl);
                await localforage.setItem(`svgList-${item}-url`, res || [])
                setdata(produce((draft: any) => {
                    draft[item].value = res
                    draft[item].url = data[item].oldUrl
                }))
            }
            form.resetFields();
            setResetloading(false)
            message.info("重置成功")
        }, 0);
    };

    // 第一次进来，初始化内存,内存里面已经有了，那就不动
    useEffect(() => {
        const init = async () => {
            const temple = {
                [templeName.device]: {
                    oldUrl: D_oldUrl,
                    url: '',
                    label: "设备类图标",
                    rule: (it: string) => isDrule(extractIdFromSvgString(it), MODEL),
                    oldValue: [],
                    value: []
                },
                [templeName.channel]: {
                    oldUrl: C_oldUrl,
                    url: '',
                    label: "通道类图标",
                    rule: (it: string) => Crule(extractIdFromSvgString(it), MODEL, MetricList),
                    oldValue: [],
                    value: []
                },
                // [templeName.location]: {
                //     oldUrl: L_oldUrl,
                //     url: '',
                //     label: "定位类图标",
                //     rule: (it: string) => Lrule(extractIdFromSvgString(it), MODEL, MetricList),
                //     oldValue: [],
                //     value: []
                // },
                [templeName.system]: {
                    oldUrl: S_oldUrl,
                    url: '',
                    label: "系统类图标",
                    rule: (it: string) => Srule(extractIdFromSvgString(it)),
                    oldValue: [],
                    value: []
                },

            }
            for (const item of Object.keys(temple)) {

                const oldUrl_svglist = await reGetSvg({ url: temple[item].oldUrl, });
                await localforage.setItem(`svgList-${item}-oldUrl`, oldUrl_svglist)

                const url = await localforage.getItem<string>(`${item}-url`)
                const url_svglist = await reGetSvg({ url: url });
                await localforage.setItem(`svgList-${item}-url`, url_svglist)

                const oldvalue = await localforage.getItem<string>(`svgList-${item}-oldUrl`)
                const value = await localforage.getItem<string>(`svgList-${item}-url`)


                await localforage.setItem(`${item}-oldUrl`, temple[item].oldUrl)
                !url && await localforage.setItem(`${item}-url`, temple[item].oldUrl)


                temple[item].value = value || oldvalue || []
                temple[item].oldValue = oldvalue || []
                temple[item].url = url || temple[item].oldUrl
            }
            setdata(temple)
        }
        MODEL.length && MetricList.length && init()
    }, [MODEL, MetricList])



    const [resList, Tdata] = useMemo(() => {

        const resList = Object.keys(data).map(item => {
            return data[item].value.filter(i => !data[item].rule(i))
        })

        const Tdata: DataType[] = Object.keys(data).map((item, index) => {
            return {
                key: index,
                diff: data[item].label,
                num1: `总共${data[item].oldValue.length}个`,
                num2: `总共${data[item].value.length}个，新增${data[item].value.length - data[item].oldValue.length}个`,
            }
        })
        return [resList, Tdata,]
    }, [data])


    if (!Object.keys(data).length) {
        return <Skeleton />
    }

    return (
        <div>
            <Row>
                <Col span={12} style={{ padding: 20 }}>
                    <Form
                        {...layout}
                        layout="vertical"
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    >
                        {
                            Object.keys(data).map(item => {
                                return <Form.Item key={item} name={item} label={<div>{data[item].label} {data[item].url !== data[item].oldUrl && `(New)`} </div>}
                                    rules={[
                                        { required: false },
                                        {
                                            pattern: /^\/\/at\.alicdn\.com\/t\/c.*\.js$/,
                                            message: "不符合在线链接规则"
                                        }
                                    ]}>
                                    <Input placeholder={data[item].url} />
                                </Form.Item>
                            })
                        }

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={sumitloading} >
                                确定读取
                            </Button>
                            <span>  </span>
                            <Button htmlType="button" onClick={onReset} loading={Resetloading}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>

                    {
                        Object.keys(data).map((item, index) => {
                            return <Col span={24}>
                                {data[item].label} ：
                                新增{data[item].value.length - data[item].oldValue.length}个；
                                命名不规范{resList[index].length}个；
                                <AllIcons data={resList[index]} limt={10} />
                                <Divider />
                            </Col>
                        })
                    }
                </Col>
                <Col span={12} style={{ padding: 20 }}>
                    <Row>
                        <Table pagination={false} columns={columns} dataSource={Tdata} />
                        <Divider />
                    </Row>
                    <Image src={require('./11.jpg')} />


                    <h3>
                        可以在这里验证更新命名以后图标的正确性：
                    </h3>
                    <h4>
                        1、更新链接以后可以看到最新的效果
                    </h4>
                    <h4>
                        2、如果需要发布，就必须拉代码下来，然后更新链接运行脚本提交代码，发布交给CI
                    </h4>
                    <h4>
                        3、非得手动发布也可以，那就看项目发布流程
                    </h4>
                </Col>
            </Row>
        </div >
    );
};

export default App;