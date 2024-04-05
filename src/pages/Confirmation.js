import ConfirmedIcon from "../images/confirmed-icon.svg";
import { useSearch } from "../contexts/SearchContext";
import CheckInOutCard from "../ui/CheckInOutCard";

export default function Confirmation() {
  const { state } = useSearch();
  const { bookedRooms } = state;
  return (
    <div className="confirmation_summary">
      <img src={ConfirmedIcon} alt="" className="img-fluid confirmed-icon" />
      <h3>Reservation Confirmed!</h3>
      <p>
        Your reservation has been confirmed. A confirmation email for your reservation has been sent to you at <a href="mailto:john@gmail.com">john@gmail.com</a>
      </p>
      <CheckInOutCard />
      <div className="confirmation_card">
        <p><strong>Confirmation Code: 254624</strong></p>
        <div className="booked_card">
          {bookedRooms.map(room => (
            <div className="card">
              <div className="card-body">
                <img src={room.thumbnail} alt="" className="card-img img-fluid" />
                <p><strong>{room.title}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-wc-primary">Check Another Reservation</button>
      </div>
    </div>
  );
}
