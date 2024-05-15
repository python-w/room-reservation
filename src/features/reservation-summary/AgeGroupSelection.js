import React, { useState } from 'react';
import { Autocomplete } from "@material-ui/lab";
import {
  Radio,
  TextField,
} from "@material-ui/core";
import { useSearch } from '../../contexts/SearchContext';

export default function AgeGroupSelection({ roomIndex, bookingId }) {
  const { state, dispatch } = useSearch()
  const { roomsInSearch } = state;
  const options = roomsInSearch.reduce((acc, room) => {
    let roomLabel = "";
    if (room.ageGroups) {
      roomLabel = room.ageGroups
        .filter(group => group.count > 0)
        .map(group => `${group.count} ${group.count > 1 ? (group.name === "Child" ? "Children" : group.name + "s") : group.name}`)
        .join(', ');
    }
    if (roomLabel) {
      acc.push({
        label: roomLabel,
        value: room.id
      });
    }
    return acc;
  }, []);

  const [selectedOption, setSelectedOption] = useState(options[roomIndex - 1]);

  const handleChange = (event, value) => {
    setSelectedOption(value);
    dispatch({
      type: "SELECT_AGEGROUP",
      payload: { bookingId: bookingId, ageGroup: value.label },
    });
  };

  return (
    <Autocomplete
      disableClearable
      className='age_group_autocomplete'
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select an option" />
      )}
      onChange={handleChange}
      value={selectedOption}
      getOptionSelected={(option, value) => option.label === value.label}
      renderOption={(option) => (
        <>
          <Radio
            style={{ marginRight: 12 }}
            checked={selectedOption && selectedOption.label === option.label}
            inputProps={{ "aria-label": `Age Group ${option.label}` }}
          />
          <div className="age_group_selection_listbox">
            <span>{option.label}</span>
          </div>
        </>
      )}
    />
  );
}
