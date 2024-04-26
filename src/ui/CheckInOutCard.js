import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { useSearch } from '../contexts/SearchContext';
import dayjs from 'dayjs';


export default function CheckInOutCard() {
    const { state } = useSearch();
    const { startDate, endDate } = state;
    const checkedInDay = dayjs(startDate).format('dddd');
    const checkedInDate = dayjs(startDate).format('MMM DD, YYYY');
    const checkedOutDay = dayjs(endDate).format('dddd');
    const checkedOutDate = dayjs(endDate).format('MMM DD, YYYY');
    return (
        <div className='checkin_out_wrap'>
            <div className="row">
                <div className="col-md-6">
                    <div className="res_date_card">
                        <div className="res_date_title">
                            <span>
                                <FontAwesomeIcon icon={faCalendarCheck} />
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
                                <FontAwesomeIcon icon={faCalendarCheck} />
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
