import { formatCurrency } from "../../utils/FormatCurrency";
import { useSearch } from "../../contexts/SearchContext";
import { Autocomplete } from "@material-ui/lab";
import {
  Radio,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";

export default function RateSelection({ bookingId, roomRates, validateReservation }) {

  const { dispatch } = useSearch();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = Object.entries(roomRates).map(([key, value], index) => ({
    label: `Rate # ${index + 1} - ${formatCurrency(value)}`,
    value,
    index,
  }));

  useEffect(() => {
    validateReservation();
  }, [selectedOption]);

  const handleChange = (event, value) => {
    setSelectedOption(value)
    dispatch({
      type: "SELECT_RATE",
      payload: { rateRoomId: bookingId, value },
    });
  };

  return (
    <Autocomplete
      className='rateselection_autocomplete'
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} onBlur={() => validateReservation()} placeholder="Select an option" />
      )}
      onChange={handleChange}
      value={selectedOption}
      getOptionSelected={(option, value) => option.label === value.label}
      renderOption={(option) => (
        <>
          <Radio
            style={{ marginRight: 12 }}
            checked={selectedOption && selectedOption.label === option.label}
            inputProps={{ "aria-label": `Rate ${option.label}` }}
          />
          <div className="rate_selection_listbox">
            <span>Rate # {option.index + 1}</span>
            <span>{formatCurrency(option.value)}</span>
          </div>
        </>
      )}
    />
  );
}
