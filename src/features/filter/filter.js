import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { useSearch } from "../../contexts/SearchContext";


export default function RoomListing() {
  const { state, dispatch } = useSearch();
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
