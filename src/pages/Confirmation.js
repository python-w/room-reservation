import { useNavigate } from 'react-router-dom';
import ConfirmedIcon from "../images/confirmed-icon.svg";
import { useSearch } from "../contexts/SearchContext";
import CheckInOutCard from "../ui/CheckInOutCard";

export default function Confirmation() {
  const navigate = useNavigate();
  const { state, dispatch } = useSearch();
  const { bookedRooms } = state;

  const handleSearchAgain = () => {
    navigate('/');
    dispatch({ type: "SEARCH_AGAIN" })
  }

  return (
    <div className="confirmation_summary">
      <div className="confirmation_msg">
        <img src={ConfirmedIcon} alt="" className="img-fluid confirmed-icon" />
        <h3>Reservation Confirmed!</h3>
        <p>
          Your reservation has been confirmed. A confirmation email for your reservation has been sent to you at <a href="mailto:john@gmail.com">john@gmail.com</a>
        </p>
      </div>
      <CheckInOutCard />
      <div className="confirmation_card">
        <p>Confirmation Code: 254624</p>
        <div className="booked_card">
          {bookedRooms.map((room, index) => (
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
