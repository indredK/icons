import * as React from 'react';
import styled from 'styled-components';
import * as AntdIcons from '../../packages/icons-react/src/icons';
import { Card, Tooltip, message } from 'antd';
import { Device, Metric } from '@ursalink-cloud/core-sdk'
import OneIcon from './_oneIcons'
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

type filterFunType = (iconName: string) => boolean
type Props = {
    type: "all" | "device" | "channel" | "system" | string,
}

const Obj = {
    'all': (iconName: string) => true,
    'device': (iconName: string | any) => {
        return Object.values(Device.MODEL)
            .map(i => i.replace(/[-_]/g, "") || "")
            .some(i => i === iconName)
    },
    "channel": (iconName: string | any) => {
        return !Object.values(Device.MODEL)
            .map(i => i.replace(/[-_]/g, "") || "")
            .some(i => i === iconName) &&
            !iconName.includes("Sys")
    },
    "system": (iconName: string) => {
        return iconName.includes("Sys")
    }
}


const AllIconDemo: React.FC<Props> = ({ type }) => {




    const visibleIconList = React.useMemo(
        () => Object.keys(allIcons).filter(Obj[type] || (i => i.includes(type || "-"))),
        [type]
    );

    return (
        <div style={{ color: '#555' }}>
            {/* <h1 style={{ textAlign: 'center' }}>{currentTheme} Icons</h1> */}
            <Container >
                {
                    visibleIconList.map(iconName => <OneIcon iconName={iconName} />)
                }
            </Container>
        </div>
    );
}

export default AllIconDemo;
