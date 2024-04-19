import { useSearch } from "../contexts/SearchContext";
import BookedRoom from "../features/reservation-summary/BookedRoom";
import { Check, ChevronLeft, SearchOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/apiRooms";
import { useState } from "react";
import CheckInOutCard from "../ui/CheckInOutCard";

export default function ReservationSummary() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useSearch();
  const { bookedRooms, searchedRooms } = state;

  function adjustRooms(searchedRooms, bookedRooms) {
    for (let searchedRoom of searchedRooms) {
      let maxOccupancy = -1;
      let targetRoomIndex = -1;

      for (let i = 0; i < bookedRooms.length; i++) {
        if (
          !bookedRooms[i].adults &&
          !bookedRooms[i].children &&
          searchedRoom.adults + searchedRoom.children <=
            bookedRooms[i].maxOccupancy
        ) {
          if (bookedRooms[i].maxOccupancy > maxOccupancy) {
            maxOccupancy = bookedRooms[i].maxOccupancy;
            targetRoomIndex = i;
          }
        }
      }

      if (targetRoomIndex !== -1) {
        bookedRooms[targetRoomIndex].adults = searchedRoom.adults;
        bookedRooms[targetRoomIndex].children = searchedRoom.children;
      }
    }
  }

  // Adjust rooms
  adjustRooms(searchedRooms, bookedRooms);

  const handleSearchAgain = () => {
    navigate("/");
    dispatch({ type: "SEARCH_AGAIN" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBooking(bookedRooms);
      navigate("/bookings");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container">
      <div className="res_sum">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-wc-transparent btn-back"
        >
          <ChevronLeft />
          Go Back
        </button>
        <h3>Reservation Summary</h3>
        <CheckInOutCard />
        <div className="room_count">
          <span>{bookedRooms.length}</span>{" "}
          {bookedRooms.length > 1 ? "Rooms" : "Room"} selected
        </div>
        <div className="row">
          {bookedRooms.map((room, index) => (
            <BookedRoom key={index} room={room} index={index + 1} />
          ))}
        </div>

        <div className="comments_box">
          <label>Comments</label>
          <textarea placeholder="Write here..."></textarea>
        </div>

        <form onSubmit={handleSubmit} className="d-flex justify-content-end">
          <input
            type="hidden"
            name="bookedRoom"
            value={JSON.stringify(bookedRooms)}
          />
          <button
            onClick={handleSearchAgain}
            className="btn btn-wc-outlined mr-3"
          >
            <SearchOutlined className="mr-2" />
            Search Again
          </button>
          <button type="submit" className="btn">
            <Check className="mr-2" />
            Book Now
          </button>
        </form>
        {error && (
          <div classNam="alert alert-danget" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
