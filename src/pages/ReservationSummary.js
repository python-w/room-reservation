import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import { useRooms } from '../contexts/RoomsContext';
import { format } from 'date-fns';

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
                            <TodayOutlinedIcon />Check in:
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
                            <InsertInvitationOutlinedIcon />Check Out:
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
        </div>
    )
}
