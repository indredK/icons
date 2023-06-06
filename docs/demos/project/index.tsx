import React, { useState } from 'react';
import { Divider, Steps } from 'antd';
import One from './one'
import Two from './two'
import Three from './three'

const show = [
    <One />,
    <Two />,
    <Three />,
    <div>
        使用脚本发布，
        后续改成自动编译管道进行发布步骤
    </div>
]

const App: React.FC = () => {
    const [current, setCurrent] = useState(2);

    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const description = 'This is a description.';

    return (
        <div className='project'>
            <Steps
                current={current}
                onChange={onChange}
                items={[
                    {
                        title: '1、导入',
                        description: "图标导入iconfont",
                    },
                    {
                        title: '2、命名',
                        description: "分情况命名",
                    },
                    {
                        title: '3、编译项目',
                        description: "编译web和app端",
                    },
                    {
                        title: '4、发布使用',
                        description: "发布详细步骤",
                    },
                ]}
            />
            <Divider />
            {show[current]}
        </div>
    );
};

export default App;