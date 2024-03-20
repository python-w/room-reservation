import { MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export default function StyledSelect({ ...props }) {
    const [selectedOption, setSelectedOption] = useState(props.selected);

    const handleChange = (event) => {
        const newSelectedOption = event.target.value;
        console.log(props.selected)
        setSelectedOption(newSelectedOption);
    };
    return (
        <Select name={props.name} value={selectedOption || ''} onChange={(event) => handleChange(event)} displayEmpty>
            {props.selected && <MenuItem value={props.selected}>{props.selected}</MenuItem>}
            {props.options.map(
                (option, index) =>
                    option.label !== props.selected && (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )
            )}
        </Select>
    )
}
