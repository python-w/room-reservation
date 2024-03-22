import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRooms } from "../../contexts/RoomsContext";


export default function RoomListing() {
  const { state, dispatch } = useRooms();
  const { roomsfilterItems } = state;

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    dispatch({ type: 'FILTER_UPDATE', payload: filterValue })
  };

  return (
    <>
      <h4 className="lfilter-heading">Filter results by</h4>
      {roomsfilterItems.map((item, index) => (
        <div className={`filter filter-0${index}`} key={index}>
          <p>
            <strong>{item.title}</strong>
          </p>
          <FormGroup>
            {item.options.map((item, index) => (
              <FormControlLabel control={<Checkbox onChange={(e) => handleFilterChange(e)} value={item} />} label={item} key={index} />
            ))}
          </FormGroup>
        </div>
      ))}
    </>
  );
}
