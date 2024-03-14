import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import roomImg from "../images/room-img.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ListWithSummary from "./AmenitiesList";
import ListingFancybox from "../ui/ListingFancyBox";
import ListingCarousel from "../ui/ListingCarousel";

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
  const ref = useRef(null);
  const [amenitiesWidth, setAmenitiesWidth] = useState(0);
  const [lfilterShow, setLFilterShow] = useState(false);
  useLayoutEffect(() => {
    setAmenitiesWidth(parseFloat(ref.current.offsetWidth));
  }, [amenitiesWidth]);

  const amenitiesItems = ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking"];

  const handleFilter = () => {
    setLFilterShow((show) => !show);
  };

  return (
    <div className="ListingPage" style={{ marginTop: "5rem" }}>
      <Button variant="outlined" onClick={handleFilter} startIcon={<SortOutlinedIcon />} className="btn btnc-outlined d-lg-none mb-lg-0 mb-4">
        Filter Results
      </Button>
      <div className="row">
        <div className={`col-lg-3 pr-lg-4 ${lfilterShow ? "d-none" : "d-lg-block"}`}>
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
        </div>
        <div className="col-lg-9 pl-lg-3">
          <div className="card">
            <div className="row">
              <div className="price-container">
                $100.50 <small>/ night</small>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
                <div className="ListingFancyB">
                  <ListingCarousel
                    options={{ infinite: false }}
                  >
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src="https://lipsum.app/id/64/1600x1200">
                      <img className="lcard-img img-fluid" alt="" src="https://lipsum.app/id/64/400x300" width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                  </ListingCarousel>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-8 col-12">
                <div className="card-body">
                  <div className="status-badges">
                    <span className="badge badge-pill badge-primary">Executive Room</span>
                    <span className="badge badge-pill badge-success">Available</span>
                  </div>
                  <h6 className="card-title">Royal Suite, Executive lounge access, Suite, 1 King</h6>
                  <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
                    <LocationOnOutlinedIcon />
                    1600 Northstar dr. Atlanta, GA 30012
                  </p>
                  <p className="card-desc lcard-desc">Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui...</p>
                  <p className="small-card-title">This facility offers:</p>
                  <div className="amenitiesList-container" ref={ref}>
                    <ListWithSummary items={amenitiesItems} maxWidth={amenitiesWidth} />
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#">View More Details</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="row">
              <div className="price-container">
                $100.50 <small>/ night</small>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
                <div className="ListingFancyB">
                  <ListingCarousel
                    options={{ infinite: false }}
                  >
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src="https://lipsum.app/id/64/1600x1200">
                      <img className="lcard-img img-fluid" alt="" src="https://lipsum.app/id/64/400x300" width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                  </ListingCarousel>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-8 col-12">
                <div className="card-body">
                  <div className="status-badges">
                    <span className="badge badge-pill badge-primary">Executive Room</span>
                    <span className="badge badge-pill badge-success">Available</span>
                  </div>
                  <h6 className="card-title">Royal Suite, Executive lounge access, Suite, 1 King</h6>
                  <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
                    <LocationOnOutlinedIcon />
                    1600 Northstar dr. Atlanta, GA 30012
                  </p>
                  <p className="card-desc lcard-desc">Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui...</p>
                  <p className="small-card-title">This facility offers:</p>
                  <div className="amenitiesList-container" ref={ref}>
                    <ListWithSummary items={amenitiesItems} maxWidth={amenitiesWidth} />
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#">View More Details</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="row">
              <div className="price-container">
                $100.50 <small>/ night</small>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
                <div className="ListingFancyB">
                  <ListingCarousel
                    options={{ infinite: false }}
                  >
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src="https://lipsum.app/id/64/1600x1200">
                      <img className="lcard-img img-fluid" alt="" src="https://lipsum.app/id/64/400x300" width="400" height="300" />
                    </div>
                    <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                      <img className="lcard-img img-fluid" alt="" src={roomImg} width="400" height="300" />
                    </div>
                  </ListingCarousel>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-8 col-12">
                <div className="card-body">
                  <div className="status-badges">
                    <span className="badge badge-pill badge-primary">Executive Room</span>
                    <span className="badge badge-pill badge-success">Available</span>
                  </div>
                  <h6 className="card-title">Royal Suite, Executive lounge access, Suite, 1 King</h6>
                  <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
                    <LocationOnOutlinedIcon />
                    1600 Northstar dr. Atlanta, GA 30012
                  </p>
                  <p className="card-desc lcard-desc">Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui...</p>
                  <p className="small-card-title">This facility offers:</p>
                  <div className="amenitiesList-container" ref={ref}>
                    <ListWithSummary items={amenitiesItems} maxWidth={amenitiesWidth} />
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#">View More Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
