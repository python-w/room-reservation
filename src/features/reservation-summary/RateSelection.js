import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox, Radio } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { formatCurrency } from '../../utils/FormatCurrency';
import { useSearch } from '../../contexts/SearchContext';

export default function RateSelection({ roomId, roomRates }) {
    const { dispatch } = useSearch();

    const [open, setOpen] = React.useState(false);

    const handleRateSelect = (value) => {
        setOpen(false);
        dispatch({ type: 'SELECT_RATE', payload: { roomId, value } });
    };
    return (
        <Autocomplete
            id="rate_selection"
            options={roomRates}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.label} - ${option.rate}`}
            value={undefined}
            onChange={(event, value) => handleRateSelect(value)}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderInput={(params) => (
                <TextField {...params} placeholder="Select an option" />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Radio
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



