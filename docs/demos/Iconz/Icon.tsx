import React from 'react';
import ReactDOM from 'react-dom/client';
import { createFromIconfontCN } from '@ant-design/icons';

const _MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4085675_0xlebobyg3f.js', // 在 iconfont.cn 上生成
});


import { Em300SldN00CnPir } from  '../../../packages/icons-react/src/icons';












const MyIcon: React.FC<any> = (props: any) => {

    return (
        <Em300SldN00CnPir {...props} />
    );
}

export default MyIcon;