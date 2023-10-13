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
                    src='./logofds.png'
                    alt='Logo de la Faculte Des Sciences'
                />
            </div>
        </div>
    );
}

export default Logo