import React from 'react';
import MyIcon from './Icon';

import styled from 'styled-components';


const colorMap = {
    online: '#54cf9b',
    offline: '#f5222d',
    warning: '#faad14',
}




const CombinationIcon: React.FC<any> = (props: any) => {
    const Div = styled.div`
    width: 100px;
    height: 100px;
    background-color: rgba(255,255,255,0%);;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before{
        content: "";
        width: 80%;
        height: 80%;
        display: block;
        background-color: ${colorMap[props.type] || colorMap['online']};
        transform: translateY(-10%) scaleX(90%) rotate(45deg);
        border-radius: 60% 50% 8% 50%;
        border: 3px solid white;
    }
    `;
    return (<Div>
        <MyIcon
            type={'qd-moon-regular'}
            style={{
                fontSize: '40px',
                position: "absolute",
                transform: "translateY(-20%)"
                // color: "red"
            }}
        ></MyIcon>
    </Div>

    );
}

export default CombinationIcon;