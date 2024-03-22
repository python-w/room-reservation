import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ListWithSummary from "./AmenitiesList";
import ListingCarousel from "../ui/ListingCarousel";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function RoomListView({ room, index }) {
    const amenitiesRef = useRef();
    const [amenitiesWidth, setAmenitiesWidth] = useState(0);

    useLayoutEffect(() => {
        if (amenitiesRef.current) {
            setAmenitiesWidth(amenitiesRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="card" key={index}>
            <div className="row">
                <div className="price-container">
                    {room.price} <small>/ night</small>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
                    <div className="roomThumb">
                        <ListingCarousel showPageCount={false} options={{ infinite: false, Dots: false, Thumbs: false }}>
                            {room.images.thumbs.map((img, i) => (
                                <div className="f-carousel__slide" key={`img-${i}`}>
                                    <img className="lcard-img img-fluid" alt="" src={img} width="400" height="350" loading="lazy" />
                                </div>
                            ))}
                        </ListingCarousel>
                    </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-8 col-12">
                    <div className="card-body">
                        <div className="status-badges">
                            <span className="badge badge-pill badge-primary">{room.roomtype}</span>
                            {room.available ? <span className="badge badge-pill badge-success">Available</span> : <span className="badge badge-pill badge-danger">Not Available</span>}
                        </div>
                        <h6 className="card-title">{room.title}</h6>
                        <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
                            <LocationOnOutlinedIcon />
                            {room.address}
                        </p>
                        <p className="card-desc lcard-desc">{room.description}</p>
                        <p className="small-card-title">This facility offers:</p>
                        <div className="amenitiesList-container" ref={amenitiesRef}>
                            <ListWithSummary items={room.amenities} maxWidth={amenitiesWidth} />
                        </div>
                    </div>
                    <div className="card-footer">
                        <a className="btn btn-wc-transparent" href="#">
                            View More Details
                        </a>
                        <button className="btn btn-wc-outlined" href="#">
                            Select Room
                        </button>
                        <div className="room_counter">
                            <p>Rooms</p>
                            <Button variant="outlined" disabled=""><RemoveOutlinedIcon /></Button>
                            <span>1</span>
                            <Button variant="outlined" disabled=""><AddOutlinedIcon /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
