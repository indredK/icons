import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `web端`,
        children: <div>
            <div>
                1、安装web端的依赖
            </div>
            <div>

                2、直接打包得到es
            </div>
            <div>

                3、可以在命名的生成和检查中查询到新导入的图标，说明导入成功，按照下方说明使用即可。
            </div>
        </div>,
    },
    {
        key: '2',
        label: `app端`,
        children: <div>
            <div>

                1、安装app端的依赖
            </div>
            <div>

                2、直接打包得到es
            </div>
        </div>,
    },
];

const App: React.FC = () => {



    return <div>
        项目第一次运行，先在最外面的菜单一次运行
        1、安装依赖
        2、更新链接
        3、运行svg脚本，把链接转化为svg，导入到svg项目里面；
        4、进行下面步骤

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
};

export default App;