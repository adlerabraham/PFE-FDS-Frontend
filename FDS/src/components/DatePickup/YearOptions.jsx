import { Select } from 'antd'
import React from 'react'

function YearOptions(props) {
    return (
        <Select placeholder="Annee">
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
            <Option value="2025">2025</Option>
            <Option value="2026">2026</Option>
            <Option value="2027">2027</Option>
            <Option value="2028">2028</Option>
            <Option value="2029">2029</Option>
            <Option value="2030">2030</Option>
            <Option value="2031">2031</Option>
            <Option value="2032">2032</Option>
            <Option value="2033">2033</Option>
            <Option value="2034">2034</Option>
            <Option value="2035">2035</Option>
            {/* Add more years */}
        </Select>
    )
}

export default YearOptions

