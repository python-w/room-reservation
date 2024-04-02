import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import { format } from "date-fns";
import BookedRoom from "../features/reservation-summary/BookedRoom";
import { Check, SearchOutlined } from "@material-ui/icons";
import ConfirmedIcon from "../images/confirmed-icon.svg";
import Room1Img from "../images/room-img-01.png";
import Room2Img from "../images/room-img-02.png";
import { useSearch } from "../contexts/SearchContext";

export default function Confirmation() {
  const { state } = useSearch();
  const { startDate, endDate, bookedRooms } = state;
  const toDay = format(new Date(), "EEEE");
  const todayDate = format(new Date(), "MMM dd, yyyy");
  const checkedInDay = startDate ? format(new Date(startDate), "EEEE") : toDay;
  const checkedInDate = startDate ? format(new Date(startDate), "MMM dd, yyyy") : todayDate;
  const checkedOutDay = startDate ? format(new Date(endDate), "EEEE") : toDay;
  const checkedOutDate = startDate ? format(new Date(endDate), "MMM dd, yyyy") : todayDate;
  return (
    <div className="confirmation_summary">
      <img src={ConfirmedIcon} alt="" className="img-fluid confirmed-icon" />
      <h3>Reservation Confirmed!</h3>
      <p>
        Your reservation has been confirmed. A confirmation email for your reservation has been sent to you at <a href="mailto:john@gmail.com">john@gmail.com</a>
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="res_date_card">
            <div className="res_date_title">
              <span>
                <TodayOutlinedIcon />
              </span>
              <strong>Check in:</strong>
            </div>
            <div className="res_date_body">
              <span>{checkedInDay}</span>
              <span>{checkedInDate}</span>
              <span>06:05 pm</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="res_date_card">
            <div className="res_date_title">
              <span>
                <InsertInvitationOutlinedIcon />
              </span>
              <strong>Check Out:</strong>
            </div>
            <div className="res_date_body">
              <span>{checkedOutDay}</span>
              <span>{checkedOutDate}</span>
              <span>06:05 pm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="confirmation_card">
            <strong>Confirmation Code: 254624</strong>
            <div className="booked_card">
              <div className="card booked_card_list">
                <div className="card-body">
                  <img src={Room1Img} alt="" className="card-img img-fluid" />
                  <strong>Royal Suite, Executive lounge access, Suite, 1 King</strong>
                </div>
              </div>
              <div className="card booked_card_list">
                <div className="card-body">
                  <img src={Room2Img} alt="" className="card-img img-fluid" />
                  <strong>1 Queen Bed, No bath</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-wc-primary">Check Another Reservation</button>
      </div>
    </div>
  );
}
