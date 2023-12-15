import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NoCourse.scss'

function NoCourses() {
    return (
        <Result
            status="warning"
            title="Pas de cours disponnible."
        />
    )

};
export default NoCourses;