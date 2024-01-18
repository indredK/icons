/* eslint-disable react/jsx-key */
import type { TabsProps } from 'antd';
import { Col, Divider, List, Row, Segmented, Select, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';

import * as AntdIcons from '../../../packages/icons-react/src/icons';
import { useSdk } from '../rules/hook';
import { BusinessType } from './config';

const Demo: React.FC = () => {
  const [Dvalue, setDvalue] = useState<string | undefined>(undefined);
  const [Cvalue, setCvalue] = useState<string | undefined>(undefined);
  const [Ovalue, setOvalue] = useState<string | undefined>(undefined);
  const [MODEL, MetricList, DEVICE_STATUS, latest, time] = useSdk();

  const allIcons = useMemo(() => {
    return Object.keys(AntdIcons);
  }, []);

  const DonChange = (value: string) => {
    setDvalue(value);
    setOvalue(undefined);
  };
  const ConChange = (value: string) => {
    setCvalue(value);
    setOvalue(undefined);
  };
  const [Doptions, Coptions] = useMemo(() => {
    return [
      MODEL.map((item: string) => {
        return {
          value: item,
          label: item,
        };
      }),
      MetricList.map((item: string) => {
        return {
          value: item,
          label: item,
        };
      }),
    ];
  }, [MODEL]);

  /** 命名规范的列表内容 */
  const device_data = useMemo(() => {
    return [
      <div>
        设备自身图标，{BusinessType.Device}：
        <Select
          style={{ minWidth: 120 }}
          showSearch
          allowClear
          value={Dvalue}
          placeholder="设备名"
          optionFilterProp="children"
          onChange={DonChange}
          filterOption={(input, option) =>
            ((option?.label ?? '') as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={Doptions}
        />
      </div>,

      <div>
        地图， {BusinessType.MapDevice}：
        <Segmented options={Object.keys(DEVICE_STATUS)} />
      </div>,
    ];
  }, [Dvalue, Cvalue, Ovalue, MODEL, setDvalue, setCvalue, setOvalue]);

  /** 命名规范的列表内容 */
  const metric_data = useMemo(() => {
    return [
      <div>
        通道图标，{BusinessType.Channel}：
        <Select
          style={{ minWidth: 120 }}
          showSearch
          allowClear
          value={Cvalue}
          placeholder="通道名"
          onChange={ConChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            ((option?.label ?? '') as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={Coptions}
        />
      </div>,

      <div>
        通道在仪表盘的图标，包括多种告警和其他状态，
        {BusinessType.DashboardChannel}：
        <Segmented
          options={['阈值未告警', '阈值告警', '特殊枚举值', '剩余量数值']}
        />
      </div>,
      <div>
        通道在仪表盘的自定义图片的图标，
        {BusinessType.DashboardChannelCustom}：
        一般而言就是通道图标的简写版,但不是每个通道都有
        <div />
      </div>,
    ];
  }, [Dvalue, Cvalue, Ovalue, MODEL, setDvalue, setCvalue, setOvalue]);

  const items: TabsProps['items'] = [
    {
      key: '兼容一款设备',
      label: `兼容一款设备`,
      children: (
        <Row>
          <Divider orientation="left">
            <div>
              选择设备名称，sdk版本号为：{latest}，时间：{time}
            </div>
          </Divider>

          <Col span={18}>
            <List
              bordered
              dataSource={device_data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>

          <Col
            style={{
              display: 'grid',
              gridTemplateRows: '5fr 5fr',
            }}
            span={6}
          >
            <div style={{ margin: 'auto' }}>
              {/* <OneIcon iconName={Tag} /> */}
            </div>
            <div style={{ width: '150px', margin: 'auto' }}>
              项目里面已经有了的，按筛选条件确定的图标
            </div>
          </Col>

          <Divider orientation="left">
            <div>
              选择通道名称，sdk版本号为：{latest},时间：{time}
            </div>
          </Divider>

          <Col span={18}>
            <List
              bordered
              dataSource={metric_data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col
            style={{
              display: 'grid',
              gridTemplateRows: '5fr 5fr',
            }}
            span={6}
          >
            <div style={{ margin: 'auto' }}>
              {/* <OneIcon iconName={Tag} /> */}
            </div>
            <div style={{ width: '150px', margin: 'auto' }}>
              项目里面已经有了的，按筛选条件确定的图标
            </div>
          </Col>
        </Row>
      ),
    },

    {
      key: '新增一个系统图标',
      label: `新增一个系统图标`,
      children: <div></div>,
    },
    {
      key: '更换',
      label: `更换`,
      children: (
        <div>
          <div>更换设备图标</div>
          <div>更换系统图标</div>
        </div>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Demo;
