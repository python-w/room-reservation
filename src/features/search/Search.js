import { Grid, Typography } from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import StyledDateRangePicker from "./DateRangePicker";
import AddRoomCard from "./AddRoomCard";
import { useSearch } from "../../contexts/SearchContext";
import { format } from 'date-fns';
import { getRooms } from "../../services/apiRooms";
import Listing from "../../pages/Listing";


export default function Search() {
    const { state, dispatch } = useSearch();
    const { dateModalOpen, roomsModalOpen, isSearchActive, startDate, endDate, prevStartDate, prevEndDate, guests, roomsInSearch, isSearchFixed } = state;

    const checkInDate = format(startDate, 'E, d MMM');
    const checkOutDate = format(endDate, 'E, d MMM');


    const handleDateModalOpen = () => {
        dispatch({ type: 'DATE_MODAL' })
    }
    const handleRoomsModalOpen = () => {
        dispatch({ type: 'ROOMS_MODAL' })
    };

    async function searchDispatch() {
        dispatch({ type: 'SEARCH_LOADING' });
        const roomlisting = await getRooms();
        dispatch({ type: 'SEARCH_ROOMS', payload: roomlisting });
    }

    const handleSearch = async () => {
        const startDateFormat = format(startDate, 'MMM dd, yyyy');
        const prevStartDateFormat = format(prevStartDate, 'MMM dd, yyyy');
        const endDateFormat = format(endDate, 'MMM dd, yyyy');
        const prevEndDateFormat = format(prevEndDate, 'MMM dd, yyyy');
        try {
            !isSearchActive && searchDispatch();
            (startDateFormat !== prevStartDateFormat || endDateFormat !== prevEndDateFormat) && searchDispatch();
        } catch (error) {
            dispatch({ type: 'SEARCH_ERROR', payload: error.message });
        }
    }

    return (
        <>
            <div className={`${isSearchFixed ? "search_wrap_fixed" : ""} search_wrap`}>
                <Grid container spacing={2} alignItems={"flex-end"}>
                    <Grid item className="search_field date_field">
                        <div className="label_group">
                            <label>Check In & Out Dates</label>
                            <button className="btn btn-wc-transparent btn-checkavail"><DateRangeOutlinedIcon />Check Availability</button>
                        </div>
                        <div className="custom_input_outer">
                            <div role="button" className="customInputBox customInputBoxCal" onClick={handleDateModalOpen}>
                                <div>
                                    <TodayOutlinedIcon /> <Typography component="span">{checkInDate}</Typography>
                                </div>
                                <div>
                                    <InsertInvitationOutlinedIcon /> <Typography component="span">{checkOutDate}</Typography>
                                </div>
                            </div>
                            {dateModalOpen &&
                                <StyledDateRangePicker />
                            }
                        </div>
                    </Grid>
                    <Grid item className="search_field room_field">
                        <div>
                            <div className="label_group">
                                <label>Guests & Rooms</label>
                            </div>
                            <div className="custom_input_outer">
                                <div role="button" onClick={handleRoomsModalOpen} className="customInputBox">
                                    <div>
                                        <PersonOutlineOutlinedIcon /> <Typography component="span">{guests || 1} {guests > 1 ? 'Guests' : 'Guest'}, {roomsInSearch.length} {roomsInSearch.length > 1 ? 'Rooms' : 'Room'}</Typography>
                                    </div>
                                </div>
                                {roomsModalOpen &&
                                    <AddRoomCard />
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="search_btn_wrap">
                            <button onClick={handleSearch} className="btn btn-wc-primary">Search <EastOutlinedIcon /></button>
                        </div>
                    </Grid>
                </Grid>
            </div >
            <Listing />
        </>
    )
}