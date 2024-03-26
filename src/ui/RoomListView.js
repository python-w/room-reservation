import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ListWithSummary from "./AmenitiesList";
import ListingCarousel from "../ui/ListingCarousel";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";

export default function RoomListView({ room, index }) {
    const amenitiesRef = useRef();
    const [amenitiesWidth, setAmenitiesWidth] = useState(0);
    const { state, dispatch } = useSearch();
    const { bookedRooms, searchedRooms } = state;

    useLayoutEffect(() => {
        if (amenitiesRef.current) {
            setAmenitiesWidth(amenitiesRef.current.offsetWidth);
        }
    }, []);

    const handleSelectRoom = (roomId, roomMaxOccupancy) => {
        dispatch({ type: 'SELECT_ROOM', payload: { id: roomId, maxOccupancy: roomMaxOccupancy, bookedRoomCount: 1 } })
    }

    const handleRoomAdd = (roomId) => {
        dispatch({ type: 'SELECTROOM_ADD', payload: roomId })
    }

    const handleRoomSub = (roomId) => {
        if (state.bookedRooms.length >= 1) {
            dispatch({ type: 'SELECTROOM_SUB', payload: roomId })
        }
    }

    const handleDetailView = (roomId) => {
        console.log(roomId)
    }

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
                            <span className="badge badge-pill badge-primary">{room.maxOccupancy}</span>
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
                        <Link to={`/room/${room.id}`} className="btn btn-wc-transparent">
                            View More Details
                        </Link>
                        {room.isSelected ?
                            <div className="room_counter">
                                <p>Rooms</p>
                                <Button variant="outlined" onClick={() => handleRoomSub(room.id)}><RemoveOutlinedIcon /></Button>
                                <span>{room.bookedRoomCount}</span>
                                <Button variant="outlined" disabled={searchedRooms.length === bookedRooms.length} onClick={() => handleRoomAdd(room.id)}><AddOutlinedIcon /></Button>
                            </div> :
                            searchedRooms.length !== bookedRooms.length &&
                            <button className="btn btn-wc-outlined" onClick={() => handleSelectRoom(room.id, room.maxOccupancy)}>
                                Select Room
                            </button>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
