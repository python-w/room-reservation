import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import { useRooms } from '../contexts/RoomsContext';
import { format } from 'date-fns';
import BookedRoom from '../features/reservation-summary/BookedRoom';
import { Check, SearchOutlined } from '@material-ui/icons';


export default function ReservationSummary() {
    const { state } = useRooms();
    const { startDate, endDate, bookedRooms } = state;
    const toDay = format(new Date(), 'EEEE');
    const todayDate = format(new Date(), 'MMM dd, yyyy');
    const checkedInDay = startDate ? format(new Date(startDate), 'EEEE') : toDay;
    const checkedInDate = startDate ? format(new Date(startDate), 'MMM dd, yyyy') : todayDate;
    const checkedOutDay = startDate ? format(new Date(endDate), 'EEEE') : toDay;
    const checkedOutDate = startDate ? format(new Date(endDate), 'MMM dd, yyyy') : todayDate;
    return (
        <div className="res_sum">
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
                <span>{bookedRooms.length}</span> rooms selected
            </div>
            <div className='row'>
                {bookedRooms.map((room, index) => <BookedRoom key={room.id} room={room} index={index + 1} />)}
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
