import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Check } from "@material-ui/icons";
import ListWithSummary from "./AmenitiesList";
import ListingCarousel from "../ui/ListingCarousel";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";
import { v4 as uuidv4 } from "uuid";
import extractAmenities from "../utils/extractAmenities";
import generateGoogleMapsUrl from "../utils/generateGoogleMapsUrl";

export default function RoomListView({ room, index }) {
  const amenitiesRef = useRef();
  const [amenitiesWidth, setAmenitiesWidth] = useState(0);
  const { state: searchState, dispatch } = useSearch();
  const { bookedRooms, searchedRooms, bookingCount } = searchState;
  useLayoutEffect(() => {
    if (amenitiesRef.current) {
      setAmenitiesWidth(amenitiesRef.current.offsetWidth);
    }
  }, []);

  const currentRoom = searchState.availableRooms.find(
    (r) => r.roomId === room.roomId
  );

  const handleSelectRoom = (room) => {
    const updatedBookedRooms = [...bookedRooms];
    const roomIndex = updatedBookedRooms.findIndex(
      (r) => r.roomId === room.roomId
    );
    const newId = uuidv4();

    if (roomIndex === -1) {
      updatedBookedRooms.push({
        roomId: room.roomId,
        bookingId: newId,
        title: room?.name,
        thumbnail: room?.images.thumbs[0],
        rates: room.rateMap,
        bookedRoomCount: 1,
      });
    }
    dispatch({ type: "UPDATE_BOOKED_ROOMS", payload: updatedBookedRooms });
    const count = currentRoom ? (currentRoom.bookedRoomCount || 0) + 1 : 1;

    dispatch({
      type: "UPDATE_BOOKED_ROOM_COUNT",
      payload: { roomId: room.roomId, count },
    });
    dispatch({ type: "BOOK_ROOM_ADD" });
  };

  const handleSelectProperty = (room) => {
    const updatedBookedRooms = [...bookedRooms];
    const roomIndex = updatedBookedRooms.findIndex(
      (r) => r.roomId === room.roomId
    );
    const newId = uuidv4();

    if (roomIndex === -1) {
      updatedBookedRooms.push({
        roomId: room.roomId,
        bookingId: newId,
        title: room?.name,
        thumbnail: room?.images.thumbs[0],
        rates: room.rateMap,
        bookedRoomCount: 1,
      });
      dispatch({ type: "UPDATE_BOOKED_ROOMS", payload: updatedBookedRooms });
      const count = currentRoom ? (currentRoom.bookedRoomCount || 0) + 1 : 1;
      dispatch({
        type: "UPDATE_BOOKED_ROOM_COUNT",
        payload: { roomId: room.roomId, count },
      });
      dispatch({ type: "BOOK_ROOM_ADD" });
    } else {
      const roomId = room.roomId;
      handleRoomSub(roomId);
    }
  };

  const handleRoomSub = (roomId) => {
    const updatedBookedRooms = bookedRooms
      .map((room) =>
        room.roomId === roomId
          ? { ...room, bookedRoomCount: Math.max(room.bookedRoomCount - 1, 0) }
          : room
      )
      .filter((room) => room.bookedRoomCount !== 0);
    dispatch({ type: "UPDATE_BOOKED_ROOMS", payload: updatedBookedRooms });

    const count = currentRoom ? (currentRoom.bookedRoomCount || 0) - 1 : 1;
    dispatch({
      type: "UPDATE_BOOKED_ROOM_COUNT",
      payload: { roomId: room.roomId, count },
    });
    dispatch({ type: "BOOK_ROOM_SUB", roomId: roomId });
  };

  const handleRoomAdd = (room) => {
    const newId = uuidv4();
    const updatedBookedRooms = [
      ...bookedRooms,
      {
        roomId: room.roomId,
        bookingId: newId,
        title: room?.name,
        thumbnail: room?.images.thumbs[0],
        rates: room.rateMap,
        bookedRoomCount: Math.min(room.bookedRoomCount + 1),
      },
    ];
    dispatch({ type: "UPDATE_BOOKED_ROOMS", payload: updatedBookedRooms });
    const count = currentRoom ? (currentRoom.bookedRoomCount || 0) + 1 : 1;

    dispatch({
      type: "UPDATE_BOOKED_ROOM_COUNT",
      payload: { roomId: room.roomId, count },
    });
    dispatch({ type: "BOOK_ROOM_ADD", roomId: room.roomId });
  };

  //Google Maps
  const googleMapsUrl = generateGoogleMapsUrl(room.address);

  //Amenities
  const amenities = extractAmenities(room);

  return (
    <div className="card" key={index}>
      <div className="row">
        {room.defaultRate !== null && (
          <div className="price-container">
            {formatCurrency(room.defaultRate)} <small>/ night</small>
          </div>
        )}
        <div className="col-xl-4 col-lg-5 col-md-4 mb-md-0 mb-4 col-12">
          <div className="roomThumb">
            <ListingCarousel showPageCount={false}>
              {room?.images.thumbs.map((img, i) => (
                <div className="f-carousel__slide" key={`img-${i}`}>
                  <img
                    className="lcard-img img-fluid"
                    alt=""
                    src={img}
                    width="400"
                    height="350"
                    loading="lazy"
                  />
                </div>
              ))}
            </ListingCarousel>
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 col-md-8 col-12">
          <div className="room_desc">
            <div className="card-body">
              <div className="status-badges">
                <span className="badge badge-pill badge-primary">
                  Executive Room
                </span>
                <span className="badge badge-pill badge-success">
                  Available
                </span>
              </div>
              <h6 className="card-title">{room?.name}</h6>
              {room.address?.addressLine1 && (
                <Link
                  to={googleMapsUrl}
                  target="_blank"
                  className="card-address"
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <LocationOnOutlinedIcon />
                  {`${room.address?.addressLine1}, ${room.address?.state}, ${room.address?.postalCode}`}
                </Link>
              )}
              {room.description && (
                <p className="card-desc lcard-desc">{room?.description}</p>
              )}
              {amenities.length > 0 && (
                <>
                  <p className="small-card-title">This facility offers:</p>
                  <div className="amenitiesList-container" ref={amenitiesRef}>
                    <ListWithSummary
                      items={amenities}
                      maxWidth={amenitiesWidth}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="card-footer">
              <Link
                to={`/room/${room.roomId}`}
                className="btn btn-wc-transparent"
              >
                View More Details
              </Link>
              {room.websiteView === 0 && room.isSelected ? (
                <div className="room_counter">
                  <p>Rooms</p>
                  <Button
                    variant="outlined"
                    onClick={() => handleRoomSub(room.roomId)}
                  >
                    <RemoveOutlinedIcon />
                  </Button>
                  <span>{room.bookedRoomCount}</span>
                  <Button
                    variant="outlined"
                    disabled={bookingCount === searchedRooms.length}
                    onClick={() => handleRoomAdd(room)}
                  >
                    <AddOutlinedIcon />
                  </Button>
                </div>
              ) : (
                room.websiteView === 0 &&
                bookingCount !== searchedRooms.length && (
                  <button
                    className="btn btn-wc-outlined"
                    onClick={() => handleSelectRoom(room)}
                  >
                    Select Room
                  </button>
                )
              )}
              {room.websiteView === 1 && room.isSelected ? (
                <button
                  className="btn-selected btn btn-wc-outlined"
                  onClick={() => handleSelectProperty(room)}
                >
                  <Check className="mr-2" /> Selected
                </button>
              ) : (
                room.websiteView === 1 &&
                bookingCount !== searchedRooms.length && (
                  <button
                    className="btn btn-wc-outlined"
                    onClick={() => handleSelectProperty(room)}
                  >
                    Select Property
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
