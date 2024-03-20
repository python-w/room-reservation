import { useState } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const BpIcon = styled("span")(({ theme }) => ({
  width: 18,
  height: 18,
  boxShadow: theme.palette.mode === "dark" ? "0 0 0 1px rgb(16 22 26 / 40%)" : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 18,
    height: 18,
    backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--primary-color)",
  },
});

export default function RoomListing() {
  const [lfilterShow, setLFilterShow] = useState(false);

  const handleFilter = () => {
    setLFilterShow((show) => !show);
  };

  return (
    <>
      <h4 className="lfilter-heading">Filter results by</h4>
      <div className="filter filter-01">
        <p>
          <strong>Room Types</strong>
        </p>
        <FormGroup>
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Standard Room" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Deluxe Room" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Executive Room" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Superior Room" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Connecting Rooms" />
        </FormGroup>
      </div>
      <div className="filter filter-02">
        <p>
          <strong>Bed Type</strong>
        </p>
        <FormGroup>
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Single / Twin" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Double" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="King" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Queen" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Bunk Bed" />
        </FormGroup>
      </div>
      <div className="filter filter-03">
        <p>
          <strong>Room Amenities</strong>
        </p>
        <FormGroup>
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Air Conditioning" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="TV" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Balcony" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Heating" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Bathtub" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Internet Access" />
          <FormControlLabel control={<Checkbox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />} label="Smoking" />
        </FormGroup>
      </div>
    </>
  );
}
