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
import { useState } from "react";
import CheckAvailability from "../check-availability/CheckAvailability";
import useScrollToTop from "../../hooks/useScrollToTop ";
import useWindowWidth from "../../hooks/useWindowWidth";


export default function Search() {
    const isTop = useScrollToTop();
    const { isLargeScreen } = useWindowWidth();

    const [dateModalOpen, setDateModalOpen] = useState(false);
    const [roomsModalOpen, setRoomsModalOpen] = useState(false);
    const [openChkAvlModal, setOpenChkAvlModal] = useState(false);

    const { state, dispatch } = useSearch();
    const { isSearchActive, startDate, endDate, prevStartDate, prevEndDate, guests, roomsInSearch } = state;

    const checkInDate = format(startDate, 'E, d MMM');
    const checkOutDate = format(endDate, 'E, d MMM');

    //Handle Date and Rooms Modal
    const handleDateModalOpen = () => {
        setDateModalOpen((modal) => !modal);
        setRoomsModalOpen(false)
    }
    const handleRoomsModalOpen = () => {
        setRoomsModalOpen((modal) => !modal)
        setDateModalOpen(false)
    };
    const handleCloseModal = () => {
        setDateModalOpen(false)
        setRoomsModalOpen(false)
    };

    //Handle Check Availability Modal
    const handleOpenChkAvlModal = () => setOpenChkAvlModal(true);
    const handleCloseChkAvlModal = () => setOpenChkAvlModal(false);

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
            !isSearchActive && await searchDispatch();
            (startDateFormat !== prevStartDateFormat || endDateFormat !== prevEndDateFormat) && await searchDispatch();
        } catch (error) {
            dispatch({ type: 'SEARCH_ERROR', payload: error });
        }
    }



    return (
        <>
            <div className={`${isTop && isLargeScreen ? "search_wrap_fixed" : ""} search_wrap`}>
                <div className="container">
                    <div className="search_wrap_inner">
                        <Grid container spacing={2} alignItems={"flex-end"}>
                            <Grid item className="search_field date_field">
                                <div className="label_group">
                                    <label>Check In & Out Dates</label>
                                    <button onClick={handleOpenChkAvlModal} className="btn btn-wc-transparent btn-checkavail"><DateRangeOutlinedIcon />Check Availability</button>
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
                                        <StyledDateRangePicker handleCloseModal={handleCloseModal} />
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
                                            <AddRoomCard handleCloseModal={handleCloseModal} />
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
                    </div>
                </div >
            </div>
            <div className="container">
                <CheckAvailability handleClose={handleCloseChkAvlModal} open={openChkAvlModal} />
                <Listing />
            </div>
        </>
    )
}