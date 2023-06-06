import * as React from 'react';
import styled from 'styled-components';
import * as AntdIcons from '../../packages/icons-react/src/icons';
import { Card, Tooltip, message } from 'antd';
import { Device, Metric } from '@ursalink-cloud/core-sdk'

import './index.css'

const { Meta } = Card;
const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  // width: 80vw;
  margin: auto;
  gap:5px;
//   不可选中
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
  user-select: none; /* 标准语法 */
`;

// const Card = styled.div`
//   height: 90px;
//   margin: 12px 0 16px;
//   width: 20%;
//   text-align: center;
// `;

const NameDescription = styled.p`
  display: block;
  text-align: center;
  transform: scale(0.83);
  font-family: 'Lucida Console', Consolas;
  white-space: nowrap;
`;

const allIcons: {
    [key: string]: any;
} = AntdIcons;

const OneIcon = ({ iconName }) => {

    if (!allIcons[iconName]) {
        return null
    }


    const Component = allIcons[iconName];

    return (
        <Tooltip
            // className={'Show'} 
            title={iconName}>
            <Card
                onClick={() => {
                    navigator.clipboard.writeText(iconName)
                    message.success(`${iconName}，已复制！`)
                }}
                hoverable
                style={{
                    width: 140, height: 140,
                    // margin: "auto",
                    padding: '20px 0px 0px 0px'
                }}
                cover={<Component
                    className={"Card"}
                    style={{ fontSize: 60, }} />}
            >
                <Meta title={<div className={"Center"}><span className={"text"} >{iconName}</span></div>} />
            </Card>
        </Tooltip>
    );
}

export default OneIcon;
