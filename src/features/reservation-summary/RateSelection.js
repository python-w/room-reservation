import { formatCurrency } from "../../utils/FormatCurrency";
import { useSearch } from "../../contexts/SearchContext";
import { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Radio, TextField } from "@material-ui/core";

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

  return (
    <Autocomplete
      id="rate_selection"
      options={Object.entries(roomRates).map(([key, value]) => ({
        key,
        value,
      }))}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.key} - $${option.value}`}
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
            <span>{option.key}</span>
            <span>{formatCurrency(option.value)}</span>
          </div>
        </>
      )}
    />
  );
}
