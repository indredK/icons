import * as React from 'react';
import styled from 'styled-components';
import * as AntdIcons from '../../../packages/icons-react/src/icons';
import { Card, Tooltip, message } from 'antd';

import '../index.css'

const { Meta } = Card;

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
                <Meta title={<div className={"Center"}><span  >{iconName}</span></div>} />
            </Card>
        </Tooltip>
    );
}

export default OneIcon;
