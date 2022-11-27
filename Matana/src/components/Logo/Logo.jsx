import React from 'react';
import { Image } from 'antd';
import './logo.scss'
import 'antd/dist/antd.css'

function Logo(props) {
    var width = Number(props.LogoWidth);

    return (
        <div className='logo-container'>
            <div className='centered'>
                <Image
                    width={width} //use interpolation for the width
                    src='./logo.png'
                    alt='Fondation Matana logo'
                />
            </div>
        </div>
    );
}

export default Logo