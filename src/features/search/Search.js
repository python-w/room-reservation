import { Box, Button, Grid, Typography } from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import StyledLabel from "../../ui/StyledLabel";
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import StyledDateRangePicker from "./DateRangePicker";
import { useEffect, useState } from "react";
import { addDays, format } from 'date-fns';
import AddRoomCard from "./AddRoomCard";

const initialRooms = [
    { id: '1', 'adults': 5, 'children': 2 },
    { id: '2', 'adults': 3, 'children': 0 },
    { id: '3', 'adults': 2, 'children': 4 },
]

export default function Search() {
    const todayDate = format(new Date(), 'E, MMM d');
    const [dateModalOpen, setDateModalOpen] = useState(false);
    const [roomsModalOpen, setRoomsModalOpen] = useState(false);
    const handleDateModalOpen = () => {
        setDateModalOpen((modal) => !modal);
        setRoomsModalOpen(false)
    }
    const handleRoomsModalOpen = () => {
        setRoomsModalOpen((modal) => !modal)
        setDateModalOpen(false)
    };
    const handleClose = () => {
        setDateModalOpen(false)
        setRoomsModalOpen(false)
    };

    const [selectedRange, setSelectedRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (item) => {
        const start = item.selection.startDate;
        const end = item.selection.endDate;
        setStartDate(format(start, 'E, MMM d'));
        setEndDate(format(end, 'E, MMM d'));
        setSelectedRange([item.selection]);
    };


    //Handle Rooms
    const [rooms, setRooms] = useState([initialRooms[0]]);
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState({});
    const [guests, setGuests] = useState(1)


    const handleAddAdults = (roomId) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            const totalAdultsInRoom = adultsCount[roomId] || 1;
            if (totalAdultsInRoom < room.adults) {
                setAdultsCount(prevCount => ({
                    ...prevCount,
                    [roomId]: (prevCount[roomId] || 1) + 1
                }));
                setGuests(guests + 1);
            }
        }
    };

    const handleMinusAdults = (roomId) => {
        if (adultsCount[roomId] > 1) {
            setAdultsCount(prevState => ({
                ...prevState,
                [roomId]: prevState[roomId] - 1
            }));
            setGuests(guests - 1);
        }
    }

    const handleAddChildren = (roomId) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            if (childrenCount[roomId] === undefined || childrenCount[roomId] < room.children) {
                setChildrenCount(prevState => ({
                    ...prevState,
                    [roomId]: (prevState[roomId] || 0) + 1
                }));
                setGuests(guests + 1);
            }
        }
    };

    const handleMinusChildren = (roomId) => {
        if (childrenCount[roomId] > 0) {
            setChildrenCount(prevState => ({
                ...prevState,
                [roomId]: prevState[roomId] - 1
            }));
            setGuests(guests - 1);
        }
    };

    const addRoom = () => {
        if (rooms.length < initialRooms.length) {
            const availableRooms = initialRooms.filter(room => !rooms.some(r => r.id === room.id));
            if (availableRooms.length > 0) {
                const nextRoom = availableRooms[0];
                const newRooms = [...rooms, nextRoom];
                setRooms(newRooms);
                setGuests(guests + 1);
            }
        }
    };

    const removeRoom = (room) => {
        const newRooms = rooms.filter((el) => el.id !== room.id);
        const removedAdults = adultsCount[room.id] || 1;
        const removedChildren = childrenCount[room.id] || 0;
        setRooms(newRooms);
        setAdultsCount(prevState => {
            const newState = { ...prevState };
            delete newState[room.id];
            return newState;
        });
        setChildrenCount(prevState => {
            const newState = { ...prevState };
            delete newState[room.id];
            return newState;
        });
        setGuests(guests - removedAdults - removedChildren);
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
                            <StyledDateRangePicker selectedRange={selectedRange} handleDateChange={handleDateChange} handleClose={handleClose} />
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
                                <AddRoomCard handleClose={handleClose} rooms={rooms} addRoom={addRoom} removeRoom={removeRoom} initialRooms={initialRooms} adultsCount={adultsCount} childrenCount={childrenCount} handleAddChildren={handleAddChildren}
                                    handleMinusChildren={handleMinusChildren} handleAddAdults={handleAddAdults} handleMinusAdults={handleMinusAdults} />
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