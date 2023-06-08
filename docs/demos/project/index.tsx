import React, { useState } from 'react';
import { Button, Divider, Steps, Tabs } from 'antd';
import Manual from './manual'
import Ci from './ci'
import One from './one'
import Two from './two'



const App: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [ciCurrent, setCiCurrent] = useState(0);
    const [manualCurrent, setManualCurrent] = useState(0);

    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const onChangeCi = (value: number) => {
        console.log('onChange:', value);
        setCiCurrent(value);
    };
    const onChangeManual = (value: number) => {
        console.log('onChange:', value);
        setManualCurrent(value);
    };
    const list = [
        <One />,
        <Two />,
        <Tabs
            defaultActiveKey="1"
            centered
            items={[
                {
                    label: `流水线发布`,
                    key: "1",
                    children: <div>
                        <Steps
                            size={'small'}
                            direction="vertical"
                            current={ciCurrent}
                            onChange={onChangeCi}
                            items={[
                                {
                                    title: '1、更新链接和版本号',
                                    description: "不更新版本号导致发布失败",
                                },
                                {
                                    title: '2、提交代码',
                                    description: "提交代码，流水线自动运行发布",
                                },
                            ]}
                        />
                        <Divider />
                        <Ci index={ciCurrent} />
                    </div>,
                },
                {
                    label: `手动发布`,
                    key: "2",
                    children: <div>
                        <Steps
                            size={'small'}
                            direction="vertical"
                            current={manualCurrent}
                            onChange={onChangeManual}
                            items={[
                                {
                                    title: '1、编译和打包',
                                    description: "web和app不同",
                                },
                                {
                                    title: '2、使用脚本发布',
                                    description: "更改版本号、发布代码",
                                },
                            ]}
                        />
                        <Divider />
                        <Manual index={manualCurrent} />
                    </div>,
                },
            ]}
        />
    ]
    return (
        <div className='project'>

            <Steps
                size={'small'}
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
                        title: '3、编译和发布',
                        description: "编译web和app、发布",
                    },
                ]}
            />
            <Divider />
            {list[current]}








        </div>
    );
};

export default App;