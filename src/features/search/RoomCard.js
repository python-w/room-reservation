import { Box, Button, Grid, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import StyledSelect from "../../ui/StyledSelect";
import { useRooms } from "../../contexts/RoomsContext";

export default function RoomCard({ room, showRemoveButton }) {

    const { state, dispatch } = useRooms();
    const { adultsCount, childrenCount } = state;

    console.log(adultsCount, childrenCount)

    const handleAddAdults = (roomId) => {
        dispatch({ type: 'ADD_ADULT', payload: roomId });
    };

    const handleMinusAdults = (roomId) => {
        dispatch({ type: 'MINUS_ADULT', payload: roomId });
    }

    const handleAddChildren = (roomId) => {
        dispatch({ type: 'ADD_CHILDREN', payload: roomId })
    };

    const handleMinusChildren = (roomId) => {
        dispatch({ type: 'MINUS_CHILDREN', payload: roomId })
    };

    const removeRoom = (room) => {
        dispatch({ type: 'REMOVE_ROOM', payload: { roomToRemove: room } });
    };

    const options = [
        { value: 'Under 1', label: 'Under 1' },
        { value: 'Under 2', label: 'Under 2' },
        { value: 'Under 3', label: 'Under 3' }
    ];
    return (
        <Box className="add_room_card">
            <Box className="room_card_header">
                <Typography variant="h6" component="h2">
                    Rooms # {room.id}
                </Typography>
                {showRemoveButton && (
                    <Button variant="transparent" onClick={() => removeRoom(room)}>
                        Remove Room
                    </Button>
                )}
            </Box>
            {room.adults !== 0 &&
                <Box className="room_row">
                    <Typography component="p">Adults</Typography>
                    <Box className="room_counter">
                        <Button variant="outlined" className={adultsCount[room.id] === 1 || adultsCount === 1 ? 'disabled' : ''} onClick={() => handleMinusAdults(room.id)}><RemoveOutlinedIcon /></Button>
                        <Typography component='span'>{adultsCount[room.id] || 1}</Typography>
                        <Button variant="outlined" className={adultsCount[room.id] === room.adults ? 'disabled' : ''} onClick={() => handleAddAdults(room.id)}><AddOutlinedIcon /></Button>
                    </Box>
                </Box>
            }
            {room.children !== 0 &&
                <>
                    <Box className="room_row">
                        <Box>
                            <Typography component="p">Children</Typography>
                            <Typography component="small">Age 0 to 17</Typography>
                        </Box>
                        <Box className="room_counter">
                            <Button variant="outlined" className={childrenCount[room.id] === 0 || childrenCount === 0 ? 'disabled' : ''} onClick={() => handleMinusChildren(room.id)}><RemoveOutlinedIcon /></Button>
                            <Typography component='span'>{childrenCount[room.id] || 0}</Typography>
                            <Button variant="outlined" className={childrenCount[room.id] === room.children ? 'disabled' : ''} onClick={() => handleAddChildren(room.id)}><AddOutlinedIcon /></Button>
                        </Box>
                    </Box>
                    <Grid container>
                        {[...Array(childrenCount[room.id])].map((_, index) => (
                            childrenCount[room.id] &&
                            <Grid item key={index} sm={6}>
                                <Box className="room_row child_age_row">
                                    <Box>
                                        <Typography component="p">Child #{index + 1} Age <span className="required">*</span></Typography>
                                        <StyledSelect
                                            name={`childAge${index}`}
                                            options={options}
                                            selected='Under 1'
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>}
        </Box>
    )
}

