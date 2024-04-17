import { formatCurrency } from '../../utils/FormatCurrency';
import { useSearch } from '../../contexts/SearchContext';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { Radio, TextField } from '@material-ui/core';

export default function RateSelection({ bookingId, roomRates }) {
    const { dispatch } = useSearch();

    const [open, setOpen] = useState(false);

    const handleRateSelect = (value) => {
        setOpen(false);
        dispatch({ type: 'SELECT_RATE', payload: { rateRoomId: bookingId, value } });
    };
    return (
        <Autocomplete
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



