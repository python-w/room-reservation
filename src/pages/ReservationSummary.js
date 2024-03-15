import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import { useRooms } from '../contexts/RoomsContext';
import { format } from 'date-fns';

export default function ReservationSummary() {
    const { state } = useRooms();
    const { todayDate, startDate, endDate } = state;
    const formattedDay = format(new Date(startDate), 'EEEE')
    const formattedDate = format(new Date(todayDate), 'MMM dd, yyyy');
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
                            <span>{formattedDay}</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
