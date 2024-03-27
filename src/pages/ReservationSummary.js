import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import { useSearch } from '../contexts/SearchContext';
import { format } from 'date-fns';
import BookedRoom from '../features/reservation-summary/BookedRoom';
import { Check, ChevronLeft, SearchOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';


export default function ReservationSummary() {
    const navigate = useNavigate();
    const { state } = useSearch();
    const { startDate, endDate, bookedRooms } = state;
    const checkedInDay = format(new Date(startDate), 'EEEE');
    const checkedInDate = format(new Date(startDate), 'MMM dd, yyyy');
    const checkedOutDay = format(new Date(endDate), 'EEEE');
    const checkedOutDate = format(new Date(endDate), 'MMM dd, yyyy');

    return (
        <div className="res_sum">
            <button onClick={() => navigate(-1)} className="btn btn-wc-transparent btn-back">
                <ChevronLeft />
                Go Back
            </button>
            <h3>Reservation Summary</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="res_date_card">
                        <div className="res_date_title">
                            <span>
                                <TodayOutlinedIcon />
                            </span>
                            <strong>Check in:</strong>
                        </div>
                        <div className='res_date_body'>
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
                        <div className='res_date_body'>
                            <span>{checkedOutDay}</span>
                            <span>{checkedOutDate}</span>
                            <span>06:05 pm</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='room_count'>
                <span>{bookedRooms.length}</span> {bookedRooms.length > 1 ? 'Rooms' : 'Room'} selected
            </div>
            <div className='row'>
                {bookedRooms.map((room, index) => <BookedRoom key={index} room={room} index={index + 1} />)}
            </div>

            <div className='comments_box'>
                <label>Comments</label>
                <textarea placeholder='Write here...'></textarea>
            </div>

            <div className='d-flex justify-content-end'>
                <button className='btn btn-wc-outlined mr-3'><SearchOutlined className='mr-2' />Search Again</button>
                <button className='btn'><Check className='mr-2' />Book Now</button>
            </div>
        </div>
    )
}
