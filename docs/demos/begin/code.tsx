import { Col, Row } from 'antd';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Demo: React.FC<any> = ({ webCode, appCode }) => {
  return (
    <Row>
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
    </Row>
  );
};

export default Demo;
