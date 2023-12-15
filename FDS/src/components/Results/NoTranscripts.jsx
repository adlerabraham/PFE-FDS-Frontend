import { Result } from 'antd'
import React from 'react'

function NoTranscripts(props) {
    if (localStorage.getItem('group')) {
        const group = localStorage.getItem('group')
        if (group.toLowerCase() === 'teacher') {
            return (
                <Result
                    status="warning"
                    title="Les examens n'ont pas encore été créés. Contacter votre coordonateur."
                />
            )
        } else if (group.toLowerCase() === 'coordinator') {
            return (
                <Result
                    status="warning"
                    title="Les examens n'ont pas encore été créés. Créer d'abord les examens."
                />
            )
        }
    }
    return (
        <Result
            status="warning"
            title="Les examens n'ont pas encore été créés."
        />
    )
}

export default NoTranscripts

