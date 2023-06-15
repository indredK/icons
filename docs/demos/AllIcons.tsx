import * as React from 'react';
import styled from 'styled-components';
import { Card, Tooltip, message } from 'antd';
import './index.css'
const { Meta } = Card;


/**
 * 在这里导出需要用到的所有图标
 * 默认是发布这个项目的时候写死的链接里面的图标
 * 这意味着需要对整个命名标准非常严格，否则不如直接导入依赖包的编译内容
 * 
 * 也留有从依赖包编译内容导入的途径，这为开发人员验证编译成果留了一手
 * 
 */


/** 获取svg字符串里面的id */
export const extractIdFromSvgString = (svgString: string) => {
    const idRegex = /id="(.*?)"/;
    const match = svgString.match(idRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}


const AllIconDemo: React.FC<any> = ({ data, limt = 9999 }) => {

    return (
        <div style={{ color: '#555' }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, padding: "10px 0px" }}>
                {data?.map((svgContent, index) => {
                    if (index + 1 > limt) {
                        return null
                    }
                    return <Tooltip
                        key={index}
                        title={extractIdFromSvgString(svgContent)!} >
                        <Card
                            onClick={() => {
                                navigator.clipboard.writeText(extractIdFromSvgString(svgContent)!)
                                message.success(`${extractIdFromSvgString(svgContent)!}，已复制！`)
                            }}
                            hoverable
                            style={{
                                width: 100, height: 100,
                                padding: '12px 0px 0px 0px'
                            }}
                            cover={
                                // <object
                                //     style={{
                                //         height: "30%",
                                //         width: "50%",
                                //         border: "2px dashed #d0d0d0",
                                //         margin: "auto"
                                //     }}
                                //     key={index}
                                //     type="image/svg+xml"
                                //     data={`data:image/svg+xml;base64,${btoa(svgContent)}`}
                                // />
                                <div
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        border: "2px dashed #d0d0d0",
                                        margin: "auto"
                                    }}
                                    key={index} dangerouslySetInnerHTML={{ __html: svgContent }} />
                            }
                        >
                            <Meta title={<div className={"Center"}>{extractIdFromSvgString(svgContent)!}</div>} />
                        </Card>
                    </Tooltip>
                }
                )}
            </div>
        </div>
    );
}

export default AllIconDemo;
