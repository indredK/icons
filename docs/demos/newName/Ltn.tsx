import React, { useMemo, useState } from 'react';
import { Select, Input, Button, Row, Col, Tabs, Tooltip, Card, message, List, Typography, Divider } from 'antd';
import type { TabsProps } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import * as AntdIcons from '../../../packages/icons-react/src/icons';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { LtnList,  Roptions } from '../rules/constant';
import { useSdk } from '../rules/hook';
const Tip1 = require("./tip1.png")
const { Meta } = Card;




const Demo = () => {
    const [Dvalue, setDvalue] = useState<string | undefined>(undefined)
    const [Cvalue, setCvalue] = useState<string | undefined>(undefined)
    const [Rvalue, setRvalue] = useState<string | undefined>(undefined)
    const [Ovalue, setOvalue] = useState<string | undefined>(undefined)
    const [MODEL, MetricList] = useSdk()

    const DonChange = (value: string) => {
        setDvalue(value)
        setRvalue(undefined)
        setCvalue(undefined)
    };
    const ConChange = (value: string) => {
        setDvalue(undefined)
        setRvalue(undefined)
        setCvalue(value)
    };
    const RonChange = (value: string) => {
        setDvalue(undefined)
        setCvalue(undefined)
        setRvalue(value)
    };
    const OonChange = (value: string) => setOvalue(value);


    const [Doptions, Coptions] = useMemo(() => {
        return [

            MODEL.map((item: string) => {
                return {
                    value: item,
                    label: item,
                }
            }),
            MetricList.map((item: string) => {
                return {
                    value: item,
                    label: item,
                }
            })
            ,
        ]
    }, [MODEL])


    /** 【表达的含义，iconfont的图标命名,  特殊说明 】 */
    const [text, Name, Tag] = useMemo(() => {

        const Tag = (Dvalue?.replace(/[-_]/g, "") || "") + upperFirst(camelCase(Cvalue)) + upperFirst(camelCase(Rvalue)) + "Ltn" + upperFirst(camelCase(Ovalue))

        if (!!Dvalue && !!Ovalue) {
            return [
                `设备型号为${Dvalue}的${LtnList.find(i => i.value == Ovalue)?.label}图标 （确定唯一）`,
                `${Dvalue}-Ltn-${Ovalue}`,
                Tag,
            ]
        } else if (!!Cvalue && !!Ovalue) {
            return [
                `通道为${Cvalue}的${LtnList.find(i => i.value == Ovalue)?.label}图标  （确定唯一）`,
                `${Cvalue}-Ltn-${Ovalue}`,
                Tag,
            ]
        } else if (!!Rvalue && !!Ovalue) {
            return [
                `特殊参数为${Rvalue}的${LtnList.find(i => i.value == Ovalue)?.label}图标  （确定唯一）`,
                `${Rvalue}-Ltn-${Ovalue}`,
                Tag,
            ]
        } else {
            return ["无", "", "",]
        }


    }, [Dvalue, Cvalue, Rvalue, Ovalue])


    const SelectName = useMemo(() => {
        return <div style={{ width: '100%' }}>
            <Row >
                <Col span={8} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }}>
                    <Select
                        style={{ width: "95%" }}
                        showSearch
                        allowClear
                        value={Dvalue}
                        placeholder="设备名"
                        optionFilterProp="children"
                        onChange={DonChange}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={Doptions}
                    />
                    <Select
                        style={{ width: "95%" }}
                        showSearch
                        allowClear
                        value={Cvalue}
                        placeholder="通道名"
                        optionFilterProp="children"
                        onChange={ConChange}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={Coptions}
                    />
                    <Select
                        style={{ width: "95%" }}
                        showSearch
                        allowClear
                        value={Rvalue}
                        placeholder="特殊参数"
                        optionFilterProp="children"
                        onChange={RonChange}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={Roptions}
                    />
                </Col>
                <Col span={2} style={{ margin: "auto" }}>
                    <span> - </span>
                    Ltn
                    <span> - </span>
                </Col>
                <Col span={14} style={{ margin: "auto" }}>
                    <Select
                        style={{ minWidth: 180 }}
                        showSearch
                        allowClear
                        value={Ovalue}
                        placeholder="状态参数"
                        optionFilterProp="children"
                        onChange={OonChange}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={LtnList}
                    />
                    <Button onClick={() => {
                        setDvalue(undefined)
                        setCvalue(undefined)
                        setOvalue(undefined)

                    }} style={{ marginLeft: 20 }}>置空</Button>
                </Col>
            </Row>
        </div>

    }, [Dvalue, Cvalue, Rvalue, Ovalue, MODEL, setDvalue, setCvalue, setOvalue])


    /** 命名规范的列表内容 */
    const data = useMemo(() => {
        return [
            SelectName,
            <div style={{ display: "flex" }}>表示含义：{text}</div>,
            <div>
                iconfont的图标命名:  {Name} {!!Name &&
                    <Tooltip
                        title={<div>复制到iconfont.cn，填入对应的图标编辑的右下角的Font Class / Symbol里面
                            <img width={230} src={Tip1}></img>
                            然后更新链接，复制到这个项目的脚本里面打包一次，就会在这里看到图片显示了
                        </div>}
                    >
                        <Button
                            size={'small'}
                            type="dashed"
                            onClick={() => {
                                console.log('%c [ navigator ]-270', 'font-size:13px; background:pink; color:#bf2c9f;', navigator)
                                navigator?.clipboard?.writeText(Name)
                                message.success(`${Name}，已复制！`)
                            }} style={{ marginLeft: 20 }}>复制</Button>
                    </Tooltip >
                }
            </div >,
            <div>
                最终生成的标签（去符号拼接） ：{Tag}{!!Tag && <Tooltip
                    title={"直接像下面的代码一样使用"}
                >
                    <Button
                        type="dashed"
                        size={'small'}
                        onClick={() => {
                            navigator.clipboard.writeText(Tag)
                            message.success(`${Tag}，已复制！`)
                        }} style={{ marginLeft: 20 }}>复制</Button>
                </Tooltip>
                }


            </div>,
        ];
    }, [Dvalue, Cvalue, Ovalue, MODEL, setDvalue, setCvalue, setOvalue])


    return (<Row>
        <Col span={20}>
            <List
                header={<div>定位类的命名（选择内容参数和状态）</div>}
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </Col>
        <Col span={4}>
            <Divider orientation="left">相关图标</Divider>
        </Col>
    </Row>);
}

export default Demo;


