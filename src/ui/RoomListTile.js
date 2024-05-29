import React, { useLayoutEffect, useRef, useState } from "react";
import ListWithSummary from "./AmenitiesList";
import ListingCarousel from "./ListingCarousel";
import { Button } from "@material-ui/core";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";
import { v4 as uuidv4 } from "uuid";
import extractAmenities from "../utils/extractAmenities";
import generateGoogleMapsUrl from "../utils/generateGoogleMapsUrl";
import { TbCheck, TbMapPin, TbMinus, TbPlus } from "react-icons/tb";
import Fancybox from "./Fancybox";

export default function RoomListTile({ room, index }) {
  const amenitiesRef = useRef();
  const [amenitiesWidth, setAmenitiesWidth] = useState(0);
  const { state: searchState, dispatch } = useSearch();
  const { selectedRooms, searchedRooms, roomsInSearch, bookingCount, selectedRoomIndex } = searchState;
  useLayoutEffect(() => {
    if (amenitiesRef.current) {
      setAmenitiesWidth(amenitiesRef.current.offsetWidth);
    }
  }, []);

  const currentRoom = searchState.availableRooms.find(
    (r) => r.roomId === room.roomId
  );

  // const occupants = roomsInSearch.map((room) => {
  //   let roomLabel = "";
  //   if (room.ageGroups) {
  //     roomLabel = room.ageGroups
  //       .filter(group => group.count > 0)
  //       .map(group => `${group.count} ${group.count > 1 ? (group.name === "Child" ? "Children" : group.name + "s") : group.name}`)
  //       .join(', ');
  //   }

  //   return roomLabel;
  // });

  const handleSelectProperty = (room) => {
    const updatedselectedRooms = [...selectedRooms];
    const roomIndex = updatedselectedRooms.findIndex(
      (r) => r.roomId === room.roomId
    );
    const newId = uuidv4();

    if (roomIndex === -1) {
      updatedselectedRooms.push({
        roomId: room.roomId,
        bookingId: newId,
        title: room?.name,
        thumbnail: room?.images.thumbs[0],
        rates: room.rateMap,
        bookedRoomCount: 1,
      });
      dispatch({ type: "UPDATE_SELECTED_ROOMS", payload: updatedselectedRooms });
      const count = currentRoom ? (currentRoom.bookedRoomCount || 0) + 1 : 1;
      dispatch({
        type: "UPDATE_SELECTED_ROOM_COUNT",
        payload: { roomId: room.roomId, count },
      });
      dispatch({ type: "BOOK_ROOM_ADD" });
    } else {
      const roomId = room.roomId;
      handleRoomSub(roomId);
    }
  };

  const handleRoomAdd = (room) => {
    const newId = uuidv4();
    const updatedselectedRooms = [
      ...selectedRooms,
      {
        roomId: room.roomId,
        bookingId: newId,
        title: room?.name,
        thumbnail: room?.images.thumbs[0],
        rates: room.rateMap,
        bookedRoomCount: Math.min(room.bookedRoomCount + 1),
        isSelected: true
      },
    ];
    dispatch({ type: "UPDATE_SELECTED_ROOMS", payload: updatedselectedRooms });
    const count = currentRoom ? (currentRoom.bookedRoomCount || 0) + 1 : 1;

    dispatch({
      type: "UPDATE_SELECTED_ROOM_COUNT",
      payload: { roomId: room.roomId, count },
    });
    dispatch({ type: "BOOK_ROOM_ADD", roomId: room.roomId });
  };

  const handleRoomSub = (roomId) => {
    const updatedselectedRooms = selectedRooms
      .map((room) =>
        room.roomId === roomId
          ? { ...room, bookedRoomCount: Math.max(room.bookedRoomCount - 1, 0) }
          : room
      )
      .filter((room) => room.roomId !== roomId || room.bookedRoomCount > 0);
    dispatch({ type: "UPDATE_SELECTED_ROOMS", payload: updatedselectedRooms });

    const count = currentRoom ? (currentRoom.bookedRoomCount || 0) - 1 : 1;
    dispatch({
      type: "UPDATE_SELECTED_ROOM_COUNT",
      payload: { roomId: room.roomId, count },
    });
    dispatch({ type: "BOOK_ROOM_SUB", roomId: roomId });
  };

  //Google Maps
  const googleMapsUrl = generateGoogleMapsUrl(room.address);

  //Amenities
  const amenities = extractAmenities(room);

  //Detail page URL
  const formattedRoomName = room.name.toLowerCase().replace(/\s+/g, '-');

  const updatedUrl = `/room/${room.roomId}/${encodeURIComponent(formattedRoomName)}`;

  // State to track whether the card is active
  const handleDetailLinkClick = (roomId) => {
    dispatch({ type: "VIEWED_ROOM", payload: roomId })
  };

  const cardClass = room.isRoomViewed ? 'card active' : 'card';

  return (
    <div className={cardClass} key={index}>
      <div className="row">
        <div className="price-container">
          <div className="price-text">
            {room.defaultRate !== null ?
              <span>{formatCurrency(room.defaultRate)}</span>
              :
              <span>{formatCurrency(Object.values(room.rateMap)[0])}</span>
            }
            <small>/ night</small>
          </div>
        </div>
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
              </div>
              <h6 className="card-title">{room?.name}</h6>
              {room.address?.addressLine1 && (
                <div className="mb-3 mb-lg-3">
                  <Fancybox>
                    <a
                      href={googleMapsUrl}
                      rel="noreferrer"
                      data-fancybox
                      className="card-address"
                    >
                      <TbMapPin className="react-icon mr-2" />
                      {`${room.address?.addressLine1}, ${room.address?.state}, ${room.address?.postalCode}`}
                    </a>
                  </Fancybox>
                </div>
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
                onClick={() => handleDetailLinkClick(room.roomId)}
                to={updatedUrl}
                className="btn btn-wc-transparent"
              >
                View More Details
              </Link>

              {room.websiteView === 0 &&
                room.isSelected ? (
                <div className="room_counter">
                  <p>Rooms</p>
                  <Button
                    variant="outlined"
                    disabled={room.bookedRoomCount === undefined || room.bookedRoomCount === 0}
                    onClick={() => handleRoomSub(room.roomId)}
                  >
                    <TbMinus className="react-icon" />
                  </Button>
                  <span>{room.bookedRoomCount || 0}</span>
                  <Button
                    variant="outlined"
                    disabled={bookingCount === searchedRooms.length}
                    onClick={() => handleRoomAdd(room)}
                  >
                    <TbPlus className="react-icon" />
                  </Button>
                </div>
              ) : (
                room.websiteView === 0 && !room.isSelected &&
                bookingCount !== searchedRooms.length && (
                  <div className="room_counter">
                    <p>Rooms</p>
                    <Button
                      variant="outlined"
                      disabled={room.bookedRoomCount === undefined || room.bookedRoomCount === 0}
                      onClick={() => handleRoomSub(room.roomId)}
                    >
                      <TbMinus className="react-icon" />
                    </Button>
                    <span>{room.bookedRoomCount || 0}</span>
                    <Button
                      variant="outlined"
                      disabled={bookingCount === searchedRooms.length}
                      onClick={() => handleRoomAdd(room)}
                    >
                      <TbPlus className="react-icon" />
                    </Button>
                  </div>
                )
              )}

              {room.websiteView === 1 && room.isSelected ? (
                <button
                  className="btn-selected btn btn-wc-outlined"
                  onClick={() => handleSelectProperty(room)}
                >
                  <TbCheck className="react-icon mr-2" /> Selected
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
