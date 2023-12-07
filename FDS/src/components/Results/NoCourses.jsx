import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NoCourse.scss'

function NoCourses() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <Result
            status="warning"
            title="Pas de cours disponnible."
            extra={
                <Button type="primary" onClick={handleBack}>
                    Retour
                </Button>
            }
        />
    )

};
export default NoCourses;