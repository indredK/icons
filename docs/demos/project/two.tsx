import React, { useState } from 'react';
import { Divider, Steps, Tooltip } from 'antd';
const Tip1 = require("../newName/tip1.png")
const Tip2 = require("../tip2.png")

const App: React.FC = () => {

    return (
        <div >
            <div>
                目前只分成两类图标两个项目，一类是设备和通道类图标；另一类是系统功能类图标（只要不属于设备通道的都归为系统功能类图标）
            </div>
            <div>
                设定每一个设备的类型都有自己的一个专属图标，以sdk的设备类型枚举为准；（如果多个设备共用一个图标。尽量避免这种情况）
            </div>
            <div>
                系统功能类图标自定义名称，不以数字开头的全小写为标准，最多使用一个-隔开，即 sun 或者 sun-light1 为合法名称，其余均不合法。
            </div>
            <div>
                1、点击左侧的
                <a href='http://localhost:8000/use/name' target={'_blank'}>命名工具</a>;

                开始对
                <a href={'https://www.iconfont.cn/'} target={"_blank"}>iconfont</a>
                的新加入的图标重新定义名称。
            </div>
            <div>
                2、使用
                <a href='http://localhost:8000/use/name' target={'_blank'}>命名工具</a>
                后生成的命名，直接复制，然后去iconfont
                <img width={230} src={Tip1}></img>

                更新图标的名字；
            </div>

            3、最后，更新并复制
            <img width={400} src={Tip2}></img>

            项目的在线链接到脚本里面使用；

        </div>
    );
};

export default App;