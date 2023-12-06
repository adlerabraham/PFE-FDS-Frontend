import React from 'react'
import { Select } from 'antd'

function MonthOptions(props) {
    return (
        <Select placeholder="Mois">
            <Option value="01">01</Option>
            <Option value="02">02</Option>
            <Option value="03">03</Option>
            <Option value="04">04</Option>
            <Option value="05">05</Option>
            <Option value="06">06</Option>
            <Option value="07">07</Option>
            <Option value="08">08</Option>
            <Option value="09">09</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
            {/* Add more months */}
        </Select>
    )
}


export default MonthOptions

