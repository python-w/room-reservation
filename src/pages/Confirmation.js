import { useNavigate } from 'react-router-dom';
import { useSearch } from "../contexts/SearchContext";
import CheckInOutCard from "../ui/CheckInOutCard";
import useScrollToTop from '../hooks/useScrollToTop';
import { useEffect } from 'react';

export default function Confirmation() {
  useScrollToTop();
  const navigate = useNavigate();
  const { state, dispatch } = useSearch();
  const { selectedRooms, selectedRange } = state;

  const handleSearchAgain = () => {
    navigate('/');
    dispatch({ type: "SEARCH_AGAIN" })
  }

  useEffect(() => {
  if (selectedRooms.length === 0) {
    handleSearchAgain()
    }
  }, [])

  return (
    <div className="confirmation_summary">
      <div className="confirmation_msg">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none" className="confirmed-icon">
          <path d="M35 0C15.65 0 0 15.65 0 35C0 54.35 15.65 70 35 70C54.35 70 70 54.3 70 35C70 15.7 54.3 0 35 0ZM36.75 45.6L29.7 52.65L22.6 45.6L12 35L19.1 27.9L29.7 38.5L50.9 17.3L57.95 24.4L36.75 45.6Z" fill="#3AAF28" />
        </svg>
        <h3>Reservation Confirmed!</h3>
        <p>
          Your reservation has been confirmed. A confirmation email for your reservation has been sent to you at <a href="mailto:john@gmail.com">john@gmail.com</a>
        </p>
      </div>
      {selectedRange && <CheckInOutCard />}
      <div className="confirmation_card">
        <p>Confirmation Code: 254624</p>
        <div className="booked_card">
          {selectedRooms.map((room, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <img src={room.thumbnail} alt="" className="card-img img-fluid" />
                <p><strong>{room.title}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button onClick={handleSearchAgain} className="btn btn-wc-primary">Check Another Reservation</button>
      </div>
    </div>
  );
}
