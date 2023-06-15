import * as React from 'react';
import styled from 'styled-components';
import * as AntdIcons from '../../../packages/icons-react/src/icons';
import { Card, Tooltip, message } from 'antd';
import OneIcon from './_oneIcons'
import '../index.css'
import { useSdk } from '../rules/hook';

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


const allIcons: {
    [key: string]: any;
} = AntdIcons;

type filterFunType = (iconName: string) => boolean
type Props = {
    type: "all" | "device" | "channel" | "system" | string,
}




const AllIconDemo: React.FC<Props> = ({ type }) => {


    const [MODEL] = useSdk()
    console.log('%c [ MODEL ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', MODEL)

    const Obj = {
        'all': (iconName: string) => true,
        'device': (iconName: string | any) => {
            return MODEL
                .map(i => i.replace(/[-_]/g, "") || "")
                .some(i => i === iconName)
        },
        "channel": (iconName: string | any) => {
            return !MODEL
                .map(i => i.replace(/[-_]/g, "") || "")
                .some(i => i === iconName) &&
                !iconName.includes("Sys")
        },
        "system": (iconName: string) => {
            return iconName.includes("Sys")
        }
    }
    const visibleIconList = React.useMemo(
        () => Object.keys(allIcons).filter(Obj[type] || (i => i.includes(type))),
        [type]
    );

    return (
        <div style={{ color: '#555' }}>
            <Container >
                {
                    visibleIconList.map(iconName => <OneIcon key={iconName} iconName={iconName} />)
                }
            </Container>
        </div>
    );
}

export default AllIconDemo;
