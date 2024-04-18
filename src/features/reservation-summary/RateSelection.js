import { formatCurrency } from "../../utils/FormatCurrency";
import { useSearch } from "../../contexts/SearchContext";
import { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";

export default function RateSelection({ bookingId, roomRates }) {
  const { dispatch } = useSearch();

  const [open, setOpen] = useState(false);

  const handleRateSelect = (value) => {
    setOpen(false);
    dispatch({
      type: "SELECT_RATE",
      payload: { rateRoomId: bookingId, value },
    });
  };

  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
        </RadioGroup>
      </FormControl>
      <Autocomplete
        id="rate_selection"
        options={Object.entries(roomRates).map(([key, value], index) => ({
          key,
          value,
          index
        }))}
        disableCloseOnSelect
        getOptionLabel={(option) => `Rate # ${option.index + 1} - $${option.value}`}
        onChange={(event, value) => handleRateSelect(value)}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Select an option" />
        )}
        renderOption={(option, { selected }) => (
          <>
            <Radio style={{ marginRight: 12 }} checked={selected} />
            <div className="rate_selection-listbox">
              <span>Rate # {option.index + 1}</span>
              <span>{formatCurrency(option.value)}</span>
            </div>
          </>
        )}
      />
    </>
  );
}
