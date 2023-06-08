import React from 'react';
import Three from './three'


const show = [
 
    <Three />,
    <div>
        使用脚本发布，
        后续改成自动编译管道进行发布步骤
    </div>
]


const Ci: React.FC<{ index: number }> = ({ index }) => {


    return show[index]
}

export default Ci;
