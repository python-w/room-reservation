import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import InsertInvitationOutlinedIcon from '@material-ui/icons/InsertInvitationOutlined';
import { format } from 'date-fns';
import { useSearch } from '../contexts/SearchContext';


export default function CheckInOutCard() {
    const { state } = useSearch();
    const { startDate, endDate } = state;
    const checkedInDay = format(new Date(startDate), 'EEEE');
    const checkedInDate = format(new Date(startDate), 'MMM dd, yyyy');
    const checkedOutDay = format(new Date(endDate), 'EEEE');
    const checkedOutDate = format(new Date(endDate), 'MMM dd, yyyy');
    return (
        <div className='checkin_out_wrap'>
            <div className="row">
                <div className="col-md-6">
                    <div className="res_date_card">
                        <div className="res_date_title">
                            <span>
                                <TodayOutlinedIcon />
                            </span>
                            <p><strong>Check in:</strong></p>
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
                            <p><strong>Check Out:</strong></p>
                        </div>
                        <div className='res_date_body'>
                            <span>{checkedOutDay}</span>
                            <span>{checkedOutDate}</span>
                            <span>06:05 pm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
