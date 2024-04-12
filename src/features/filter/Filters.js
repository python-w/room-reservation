import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getRoomFilters } from "../../services/apiRoomFilters";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

export default function Filters() {
  const [roomFilters, setRoomFilters] = useState([]);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    console.log(filterValue);
  };

  useEffect(() => {
    async function getFilters() {
      try {
        const roomFilters = await getRoomFilters();
        setRoomFilters(roomFilters);
      } catch (err) {
        setError(err.message);
      }
    }
    getFilters();
  }, []);

  return (
    <>
      <h4 className="lfilter-heading">Filter results by</h4>
      {error && <Alert severity="error">{error}</Alert>}
      {roomFilters.map((item, index) => (
        <div className="filter" key={index}>
          <p>
            <strong>{item.categoryName}</strong>
          </p>
          <FormGroup>
            {item.filters.map((filter, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => handleFilterChange(e)}
                    value={filter.filterName}
                  />
                }
                label={filter.filterName}
                key={index}
              />
            ))}
          </FormGroup>
        </div>
      ))}
    </>
  );
}
