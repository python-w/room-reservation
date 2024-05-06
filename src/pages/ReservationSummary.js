import { useSearch } from "../contexts/SearchContext";
import RoomSummary from "../features/reservation-summary/RoomSummary";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/apiRooms";
import { useState } from "react";
import CheckInOutCard from "../ui/CheckInOutCard";

export default function ReservationSummary() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useSearch();
  const { selectedRooms} = state;  

  const handleSearchAgain = () => {
    navigate("/");
    dispatch({ type: "SEARCH_AGAIN" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBooking(selectedRooms);
      navigate("/bookings");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="res_sum">
      <button
        onClick={() => navigate("/searchresults")}
        className="btn btn-wc-transparent btn-back"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
        Go Back
      </button>
      <h3>Reservation Summary</h3>
      <CheckInOutCard />
      <div className="room_count">
        <span>{selectedRooms.length}</span>{" "}
        {selectedRooms.length > 1 ? "Rooms" : "Room"} selected
      </div>
      <div className="row">
        {selectedRooms.map((room, index) => (
          <RoomSummary key={index} room={room} index={index + 1} />
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
          value={JSON.stringify(selectedRooms)}
        />
        <button
          onClick={handleSearchAgain}
          className="btn btn-wc-outlined mr-3"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Search Again
        </button>
        <button type="submit" className="btn">
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Book Now
        </button>
      </form>
      {error && (
        <div classNam="alert alert-danget" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
