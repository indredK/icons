import React from 'react';


const show = [
    <div>
        记得更新版本号，然后运行一次importSvg脚本，把所有更改直接提交

    </div>,
    <div>
        使用脚本发布，
        后续改成自动编译管道进行发布步骤
    </div>
]


const Manual: React.FC<{ index: number }> = ({ index }) => {



    return show[index]
}

export default Manual;
