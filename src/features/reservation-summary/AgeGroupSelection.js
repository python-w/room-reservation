import React, { useEffect, useState } from 'react';
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
} from "@material-ui/core";
import { useSearch } from '../../contexts/SearchContext';

export default function AgeGroupSelection({ bookingId, validateReservation, ageGroupOptions }) {
  const { dispatch } = useSearch();  

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    validateReservation();
  }, [selectedOption]);

  const handleChange = (event, value) => {
    setSelectedOption(value);
    dispatch({
      type: "SELECT_AGEGROUP",
      payload: { bookingId: bookingId, ageGroup: value },
    });
  };

  return (
    <Autocomplete
      className='age_group_autocomplete'
      options={ageGroupOptions}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} onBlur={() => validateReservation()} placeholder="Select an option" />
      )}
      onChange={handleChange}
      value={selectedOption}
      getOptionSelected={(option, value) => option === value}
    />
  );
}
