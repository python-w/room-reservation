import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ratelist = [
    { title: 'Rate #1', rate: '$250.00' },
    { title: 'Rate #2', rate: '$350.00' },
    { title: 'Rate #3', rate: '$450.00' },
    { title: 'Rate #4', rate: '$550.00' },
    { title: 'Rate #5', rate: '$650.00' },
];


export default function RateSelection() {
    return (
        <Autocomplete
            id="rate_selection"
            options={ratelist}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.title} - ${option.rate}`}
            renderInput={(params) => (
                <TextField {...params} placeholder="Select an option" />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 12 }}
                        checked={selected}
                    />
                    <div>
                        {option.title}
                        <strong>{option.rate}</strong>
                    </div>
                </li>
            )}
        />
    );
}



