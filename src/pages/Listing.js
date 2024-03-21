import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import roomImg from "../images/room-img.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ListWithSummary from "./AmenitiesList";
import ListingCarousel from "../ui/ListingCarousel";
import Filters from "../features/filter/filter";
import Search from "../features/search/Search";
import { RoomListings } from "../contexts/RoomListingApi";

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

  const RoomFilters = [
    {
      title: "Room Types",
      options: ["Standard Room", "Deluxe Room", "Executive Room", "Superior Room", "Connecting Rooms"],
    },
    {
      title: "Bed Type",
      options: ["Single / Twin", "Double", "King", "Queen", "Bunk Bed"],
    },
    {
      title: "Room Amenities",
      options: ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "Air Conditioning", "TV", "Balcony", "Heating", "Bathtub", "Smoking"],
    },
  ];

  const [amenitiesWidth, setAmenitiesWidth] = useState(0);
  const [lfilterShow, setLFilterShow] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useLayoutEffect(() => {
    if (ref.current) {
      setAmenitiesWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  const handleFilter = () => {
    setLFilterShow((show) => !show);
  };
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(filterValue)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== filterValue);
    } else {
      updatedFilters.push(filterValue);
    }
    setSelectedFilters(updatedFilters);
  };
  const filterRoomListings = () => {
    if (selectedFilters.length === 0) {
      return RoomListings;
    }
    return RoomListings.filter((room) => {
      // Check if room type matches any selected room types
      if (selectedFilters.includes(room.roomtype)) {
        return true;
      }

      // Check if bed type matches any selected bed types
      if (selectedFilters.includes(room.bedtype)) {
        return true;
      }
      if (selectedFilters.every((amenity) => room.amenities.some((roomAmenity) => roomAmenity.label === amenity))) {
        const amenitiesMatch = selectedFilters.every((amenity) => room.amenities.some((roomAmenity) => roomAmenity.label === amenity));
        return amenitiesMatch;
      }
    });
  };
  const filteredListings = filterRoomListings();

  return (
    <div className="ListingPage">
      <Search />
      <Button variant="outlined" onClick={handleFilter} startIcon={<SortOutlinedIcon />} className="btn btnc-outlined d-lg-none mb-lg-0 mb-4">
        Filter Results
      </Button>
      <div className="row">
        <div className={`col-lg-3 pr-lg-4 ${lfilterShow ? "d-none" : "d-lg-block"}`}>
          <Filters filterItems={RoomFilters} handleFilterChange={handleFilterChange} />
        </div>
        <div className="col-lg-9 pl-lg-3">
          {filteredListings.map((room, index) => (
            <div className="card" key={index}>
              <div className="row">
                <div className="price-container">
                  {room.price} <small>/ night</small>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
                  <div className="ListingFancyB">
                    <ListingCarousel showPageCount={false} options={{ infinite: false, Dots: false, Thumbs: false }}>
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
                      <span className="badge badge-pill badge-primary">{room.roomtype}</span>
                      {room.status ? <span className="badge badge-pill badge-success">Available</span> : <span className="badge badge-pill badge-danger">Not Available</span>}
                    </div>
                    <h6 className="card-title">{room.title}</h6>
                    <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
                      <LocationOnOutlinedIcon />
                      {room.address}
                    </p>
                    <p className="card-desc lcard-desc">{room.roomdescription}</p>
                    <p className="small-card-title">This facility offers:</p>
                    <div className="amenitiesList-container" ref={ref}>
                      <ListWithSummary items={room.amenities} maxWidth={amenitiesWidth} />
                    </div>
                  </div>
                  <div className="card-footer">
                    <a className="btn btn-wc-transparent" href="#">
                      View More Details
                    </a>
                    <a className="btn btn-wc-outlined" href="#">
                      Select Room
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
