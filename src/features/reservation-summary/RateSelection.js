import { formatCurrency } from "../../utils/FormatCurrency";
import { useSearch } from "../../contexts/SearchContext";
import { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

export default function RateSelection({ bookingId, roomRates }) {
  const { dispatch } = useSearch();

  const [open, setOpen] = useState(false);

  const options = Object.entries(roomRates).map(([key, value], index) => ({
    label: `Rate # ${index + 1} - ${value}`,
    value,
    index,
  }));

  const handleRateSelect = (value) => {
    setOpen(false);
    dispatch({
      type: "SELECT_RATE",
      payload: { rateRoomId: bookingId, value },
    });
  };

  const handleChange = (event, value) => {
    console.log("Selected value:", value);
  };

  return (
    <>
      <FormControl>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select an option" />
          )}
          onChange={handleChange}
          renderOption={(option, { selected }) => (
            <>
              <Radio
                style={{ marginRight: 12 }}
                checked={selected}
                inputProps={{ "aria-label": `Rate ${option.label}` }}
              />
              <div className="rate_selection_listbox">
                <span>Rate # {option.index + 1}</span>
                <span>{formatCurrency(option.value)}</span>
              </div>
            </>
          )}
        />
      </FormControl>
    </>
  );
}
