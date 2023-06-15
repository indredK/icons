import React, { useMemo, useState } from 'react';
import { Select, Input, Button, Row, Col, Tabs, Tooltip, Card, message, List, Typography, Divider } from 'antd';
import type { TabsProps } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';




const Demo = ({ webCode, appCode }) => {




    return (<Row>
        <Col span={11}>
            web:
            <SyntaxHighlighter language="typescript" style={docco}>
                {webCode}
            </SyntaxHighlighter>
        </Col>
        <Col span={1} />
        <Col span={11}>
            app:
            <SyntaxHighlighter language="typescript" style={docco}>
                {appCode}
            </SyntaxHighlighter>
        </Col>
    </Row>);
}

export default Demo;


