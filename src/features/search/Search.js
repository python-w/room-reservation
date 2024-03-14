import { Box, Button, Grid, Typography } from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import StyledLabel from "../../ui/StyledLabel";
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import StyledDateRangePicker from "./DateRangePicker";
import AddRoomCard from "./AddRoomCard";
import { useRooms } from "../../contexts/RoomsContext";

export default function Search() {

    const { state, dispatch } = useRooms();
    const { dateModalOpen, roomsModalOpen, startDate, endDate, guests, rooms, todayDate } = state;

    const handleDateModalOpen = () => {
        dispatch({ type: 'DATE_MODAL' })
    }
    const handleRoomsModalOpen = () => {
        dispatch({ type: 'ROOMS_MODAL' })
    };

    return (
        <div className="search_wrap">
            <Grid container spacing={2} alignItems={"flex-end"}>
                <Grid item flex={1}>
                    <Box display="flex" justifyContent={"space-between"} alignItems={"center"} className="label_group">
                        <StyledLabel>Check in & out dates</StyledLabel>
                        <Button><DateRangeOutlinedIcon /> Check Availability</Button>
                    </Box>
                    <div className="custom_input_outer">
                        <Box role="button" className="customInputBox customInputBoxCal" onClick={handleDateModalOpen}>
                            <Box>
                                <TodayOutlinedIcon /> <Typography component="span">{startDate === null ? todayDate : startDate}</Typography>
                            </Box>
                            <Box>
                                <InsertInvitationOutlinedIcon /> <Typography component="span">{endDate === null ? todayDate : endDate}</Typography>
                            </Box>
                        </Box>
                        {dateModalOpen &&
                            <StyledDateRangePicker />
                        }
                    </div>
                </Grid>
                <Grid item flex={1}>
                    <Box>
                        <Box className="label_group">
                            <StyledLabel>Guests & Rooms</StyledLabel>
                        </Box>
                        <div className="custom_input_outer">
                            <Box role="button" onClick={handleRoomsModalOpen} className="customInputBox">
                                <Box>
                                    <PersonOutlineOutlinedIcon /> <Typography component="span">{guests || 1} {guests > 1 ? 'Guests' : 'Guest'}, {rooms.length} {rooms.length > 1 ? 'Rooms' : 'Room'}</Typography>
                                </Box>
                            </Box>
                            {roomsModalOpen &&
                                <AddRoomCard />
                            }
                        </div>
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="search_btn_wrap">
                        <Button>Search <EastOutlinedIcon /></Button>
                    </Box>
                </Grid>
            </Grid>

        </div >
    )
}