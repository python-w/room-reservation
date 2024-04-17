import { Box, Button, Grid, Typography } from "@material-ui/core";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useSearch } from "../../contexts/SearchContext";


export default function RoomCard({ index, room, showRemoveButton }) {

    const { state, dispatch } = useSearch();
    const { adultsCount, childrenCount } = state;

    const handleAddAdult = (roomId) => {
        dispatch({ type: 'ADD_ADULT', payload: roomId });
    };

    const handleMinusAdult = (roomId) => {
        dispatch({ type: 'MINUS_ADULT', payload: roomId });
    };

    const handleAddChildren = (roomId) => {
        dispatch({ type: 'ADD_CHILDREN', payload: roomId });
    };

    const handleMinusChildren = (roomId) => {
        dispatch({ type: 'MINUS_CHILDREN', payload: roomId });
    };

    const removeRoom = (room) => {
        dispatch({ type: 'REMOVE_ROOM', payload: { roomToRemove: room } });
    };

    return (
        <Box className="add_room_card">
            <div className="room_card_header">
                <p>
                    <strong>Room # {index + 1}</strong>
                </p>
                {showRemoveButton && (
                    <button className="btn btn-wc-transparent" variant="transparent" onClick={() => removeRoom(room)}>
                        Remove Room
                    </button>
                )}
            </div>
            {room.adults !== 0 &&
                <Box className="room_row">
                    <Typography component="p">Adults</Typography>
                    <Box className="room_counter">
                        <Button variant="outlined" disabled={!adultsCount[room.id] >= 1 || adultsCount[room.id] === 1} onClick={() => handleMinusAdult(room.id)}><RemoveOutlinedIcon /></Button>
                        <Typography component='span'>{adultsCount[room.id] || 1}</Typography>
                        <Button variant="outlined" disabled={adultsCount[room.id] === room.adults} onClick={() => handleAddAdult(room.id)}><AddOutlinedIcon /></Button>
                    </Box>
                </Box>
            }
            {room.children !== 0 &&
                <>
                    <Box className="room_row">
                        <Box>
                            <Typography component="p">Children</Typography>
                        </Box>
                        <Box className="room_counter">
                            <Button variant="outlined" disabled={!childrenCount[room.id] > 0 || childrenCount[room.id] === 0} onClick={() => handleMinusChildren(room.id)}><RemoveOutlinedIcon /></Button>
                            <Typography component='span'>{childrenCount[room.id] || 0}</Typography>
                            <Button variant="outlined" disabled={childrenCount[room.id] === room.children} onClick={() => handleAddChildren(room.id)}><AddOutlinedIcon /></Button>
                        </Box>
                    </Box>
                </>}
        </Box>
    )
}

