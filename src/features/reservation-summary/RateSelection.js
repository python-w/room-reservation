import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { formatCurrency } from '../../utils/FormatCurrency';
import { useSearch } from '../../contexts/SearchContext';

export default function RateSelection({ roomId, roomRates }) {
    const { state, dispatch } = useSearch();
    const { selectedRate } = state;

    const handleRateSelect = (selectedRate) => {
        dispatch({ type: 'SELECT_RATE', payload: { roomId, selectedRate } });
    };
    return (
        <Autocomplete
            id="rate_selection"
            options={roomRates}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.label} - ${option.rate}`}
            value={selectedRate}
            onChange={(event, value) => handleRateSelect(value)}
            renderInput={(params) => (
                <TextField {...params} placeholder="Select an option" />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckBoxIcon />}
                        style={{ marginRight: 12 }}
                        checked={selected}
                    />
                    <div>
                        {option.label}
                        <strong>{formatCurrency(option.rate)}</strong>
                    </div>
                </li>
            )}
        />
    );
}



