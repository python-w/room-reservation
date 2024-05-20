import React, { useEffect, useState } from 'react';
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
} from "@material-ui/core";
import { useSearch } from '../../contexts/SearchContext';

export default function AgeGroupSelection({ roomIndex, bookingId }) {
  const { state, dispatch } = useSearch();
  const { roomsInSearch } = state;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const newOptions = roomsInSearch.reduce((acc, room) => {
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
    setOptions(newOptions);
  }, [roomsInSearch]);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (options.length > 0 && roomIndex > 0 && roomIndex <= options.length) {
      setSelectedOption(options[roomIndex - 1]);
    }
  }, [options, roomIndex]);

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
    />
  );
}
