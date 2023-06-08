import React, { useMemo, useState } from 'react';
import { Device, Metric } from '@ursalink-cloud/core-sdk'
import { Select, Input, Button, Row, Col, Tabs, Tooltip, Card, message, List, Typography, Divider } from 'antd';
import type { TabsProps } from 'antd';
import OneIcon from '../_oneIcons'

import { Em300SldN00CnPir } from '../../../packages/icons-react/src/icons';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import * as AntdIcons from '../../../packages/icons-react/src/icons';
import AllIconDemo from '../_showIcons'
import { InfoCircleTwoTone } from '@ant-design/icons';
const Tip1 = require("./tip1.png")
const { Meta } = Card;

/** 只出现在 设备型号 - Ltn - 这个参数 ，表示设备的定位状态 */
const LtnList = [
  {
    value: 'inactive',
    label: '未激活',
  },
  {
    value: 'online',
    label: '在线',
  },
  {
    value: 'alarm',
    label: '警告',
  },
  {
    value: 'offline',
    label: '离线',
  },
]



const Demo = () => {
  const [Dvalue, setDvalue] = useState<string | undefined>(undefined)
  const [Cvalue, setCvalue] = useState<string | undefined>(undefined)
  const [Ovalue, setOvalue] = useState<string | undefined>(undefined)


  const allIcons = useMemo(() => { return Object.keys(AntdIcons) }, [])

  console.log('%c [ AntdIcons ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', allIcons)


  const DonChange = (value: string) => setDvalue(value);
  const ConChange = (value: string) => {
    if (value == "Ltn" && !LtnList.map(i => i.value).includes(Ovalue || "")) {
      setOvalue(undefined)
    } else if (value !== "Ltn" && LtnList.map(i => i.value).includes(Ovalue || "")) {
      setOvalue(undefined)
    }
    setCvalue(value)
  };
  const OonChange = (value: string) => setOvalue(value);


  const Doptions = useMemo(() => {
    return [...new Set(Object.values(Device.MODEL))].map((item: string) => {
      return {
        value: item,
        label: item,
      }
    })
  }, [])

  const Coptions = useMemo(() => {
    return [
      {
        value: 'Ltn',
        label: '地图定位',
      },
      ...Object.values(Metric.SENSOR_CHANNEL_TYPE).map((item: string) => {
        return {
          value: item,
          label: item,
        }
      })
    ]
  }, [])


  const Ooptions = useMemo(() => {

    if (Cvalue === "Ltn") {
      return LtnList
    }
    return [
      {
        value: 'monochrome',
        label: '自定义图片的通道',
      },
      {
        value: '0',
        label: '级别0',
      },
      {
        value: '1',
        label: '级别1',
      },
      {
        value: '2',
        label: '级别2',
      },
      {
        value: '3',
        label: '级别3',
      },
      {
        value: '4',
        label: '级别4',
      },
    ]

  }, [Cvalue])

  const CountFun = (str: string) => {
    return allIcons.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.includes(str) ? 1 : 0);
    }, 0);
  }
  const FindOne = (str: string) => {
    return allIcons.find((item) => {
      return item.includes(str)
    });
  }



  const SelectName = useMemo(() => {
    return <div>
      <Select
        style={{ minWidth: 120 }}
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
      <span> - </span>

      <Select
        style={{ minWidth: 120 }}
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
      <span> - </span>

      <Select
        style={{ minWidth: 120 }}
        showSearch
        allowClear
        value={Ovalue}
        placeholder="其他参数"
        optionFilterProp="children"
        onChange={OonChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={Ooptions}
      />
      <Button onClick={() => {
        setDvalue(undefined)
        setCvalue(undefined)
        setOvalue(undefined)

      }} style={{ marginLeft: 20 }}>置空</Button>
    </div>
  }, [Dvalue, Cvalue, Ovalue, setDvalue, setCvalue, setOvalue])



  /** 【表达的含义，iconfont的图标命名,  特殊说明 】 */
  const [text, Name, Tag, Note] = useMemo(() => {

    const Tag = (Dvalue?.replace(/[-_]/g, "") || "") + upperFirst(camelCase(Cvalue)) + upperFirst(camelCase(Ovalue))
    if (!!Dvalue && !Cvalue && !Ovalue) {
      // const name = upperFirst(camelCase(Dvalue))
      const name = Dvalue
      return [
        `设备型号为      ${Dvalue}      的图标 （确定唯一）`,
        name,
        Tag,
        "只传入设备参数，保持设备图标只有唯一一个"
      ]
    } else if (!Dvalue && !!Cvalue && !Ovalue) {
      const name = upperFirst(camelCase(Cvalue))
      // const name = Cvalue
      return [
        `通道为      ${Cvalue}      的图标默认图标（可能有其他条件指定特殊图标）`,
        name,
        Tag,
        `通道可能有其他参数，特殊设备甚至可能有不一样的通道图标，或者图标可能有其他状态，
        都可能对应不同的图标，目前已导入的所有相关图标如下：(${CountFun(upperFirst(camelCase(name)))})个`
      ]
    } else if (!!Dvalue && !!Cvalue && !Ovalue) {
      // const name = upperFirst(camelCase(Dvalue)) + "-" + upperFirst(camelCase(Cvalue))
      const name = Dvalue + "-" + upperFirst(camelCase(Cvalue))
      return [
        `通道为    ${Cvalue}      的 ${Dvalue} 设备的默认图标（可能有其他状态指定特殊图标）`,
        name,
        Tag,
        `这个通道的设备型号已指定，但也有可能有其他状态，对应不同的图标，
        目前已导入的所有相关图标如下：(${CountFun(upperFirst(camelCase(name)))})个`
      ]
    } else if (!!Dvalue && !!Cvalue && !!Ovalue) {
      // const name = upperFirst(camelCase(Dvalue)) + "-" + upperFirst(camelCase(Cvalue)) + "-" + upperFirst(camelCase(Ovalue))
      const name = Dvalue + "-" + upperFirst(camelCase(Cvalue)) + "-" + upperFirst(camelCase(Ovalue))
      return [
        `通道为    ${Cvalue}      的 ${Dvalue} 设备的   条件为 ${Ovalue}   的图标一般图标（确定唯一）`,
        name,
        Tag,
        `已指定唯一图标`
      ]
    } else if (!Dvalue && !!Cvalue && !!Ovalue) {
      // const name = upperFirst(camelCase(Cvalue)) + "-" + upperFirst(camelCase(Ovalue))
      const name = upperFirst(camelCase(Cvalue)) + "-" + upperFirst(camelCase(Ovalue))
      return [
        `通道为    ${Cvalue}      的 条件为 ${Ovalue}   的图标一般图标（ 可能有其他条件指定特殊图标 ）`,
        name,
        Tag,
        `这个通道的具体状态已经指定，但有可能特殊型号会有不同的图标，
        目前已导入的所有相关图标如下：(${CountFun(upperFirst(camelCase(name)))})个`
      ]
    } else {
      return ["无", "", "", "无"]
    }
  }, [Dvalue, Cvalue, Ovalue])


  /** 命名规范的列表内容 */
  const data = useMemo(() => {
    return [
      SelectName,
      <div style={{ display: "flex" }}>
        表示含义：{text}
      </div>,
      <div>
        iconfont的图标命名 （设备型号不变，其他驼峰化后拼接）:  {Name} {!!Name &&
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
      `说明：${Note}`,
    ];
  }, [Dvalue, Cvalue, Ovalue, setDvalue, setCvalue, setOvalue])

  const items: TabsProps['items'] = [

    {
      key: '1',
      label: `设备和通道类图标`,
      children:
        <Row>
          <Col span={20}>
            <List
              header={<div>设备和通道类的命名（系统类和其他自定义一个单词就可以了）</div>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>

          <Col style={{
            display: "grid",
            gridTemplateRows: "5fr 5fr"
          }} span={4}>
            <div style={{ margin: "auto", }}>
              <OneIcon iconName={Tag} />
            </div>
            <div style={{ width: "150px", margin: "auto" }}>
              项目里面已经有了的，按筛选条件确定的图标
            </div>
          </Col>

          <Divider orientation="left">相关图标</Divider>

          <AllIconDemo type={Tag} />




          <Col span={24}>
            <Divider orientation="left">代码使用：</Divider>
            <pre style={{ backgroundColor: "#f3f3f3" }}>
              {`
  import React from 'react';
  import { XzIcons } from '@ursalink-cloud/core-sdk'
  
  export default ()=><XzIcons name={'${Name}'}  />
  
  `}
            </pre>
            <Divider orientation="left">或者使用变量代替：</Divider>
            <pre style={{ backgroundColor: "#f3f3f3" }}>
              {`
  import React from 'react';
  import { XzIcons } from '@ursalink-cloud/core-sdk'
  
  export default () => {
      return <XzIcons
        model={'${Dvalue}'}
        channel={ '${Cvalue}' }
        status={ '${Ovalue}' }
      />}
  />
  
  `}
            </pre>
            <Divider orientation="left">或者直接使用命名（不推荐）</Divider>
            <pre style={{ backgroundColor: "#f3f3f3" }}>
              {`
  import React from 'react';
  import { ${Tag} } from '@ursalink-cloud/core-sdk'
  
  export default () => {
      return <${Tag} />}
  />
  
  `}
            </pre>
          </Col>
        </Row>,
    },
    {
      key: '2',
      label: `系统功能类图标`,
      children: <div>
        <Divider orientation="left">直接使用命名（推荐）</Divider>
        <AllIconDemo type={Tag} />

        <pre style={{ backgroundColor: "#f3f3f3" }}>
          {`
  import React from 'react';
  import { XzIcons } from '@ursalink-cloud/core-sdk'
  
  export default () => {
      return <XzIcons
        model={'${Dvalue}'}
        channel={ '${Cvalue}' }
        status={ '${Ovalue}' }
      />}
  />
  
  `}
        </pre>
      </div>,
    },
    {
      key: '3',
      label: ` 或许可能有定位类图标`,
      children: <div>
        <Divider orientation="left">直接使用命名（推荐）</Divider>
        <AllIconDemo type={Tag} />

        <pre style={{ backgroundColor: "#f3f3f3" }}>
          {`
  import React from 'react';
  import { XzIcons } from '@ursalink-cloud/core-sdk'
  
  export default () => {
      return <XzIcons
        model={'${Dvalue}'}
        channel={ '${Cvalue}' }
        status={ '${Ovalue}' }
      />}
  />
  
  `}
        </pre>
      </div>,
    },
  ];
  return (<Tabs defaultActiveKey="1" items={items} />);
}

export default Demo;


