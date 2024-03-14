import { Box, Button } from "@mui/material";
import RoomCard from "./RoomCard";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useRooms } from "../../contexts/RoomsContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useRef } from "react";


export default function AddRoomCard() {

    const refRoomModal = useRef();
    const { state, dispatch } = useRooms();
    const { initialRooms, rooms } = state;

    const addRoom = () => {
        dispatch({ type: 'ADD_ROOM' })
    };

    const handleClose = () => {
        dispatch({ type: 'CLOSE_MODAL' })
    };

    useOnClickOutside(refRoomModal, () => {
        dispatch({ type: 'CLOSE_MODAL' })
    })

    return (
        <Box ref={refRoomModal} className='inline_modal'>
            <Box className="inline_modal_body">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        room={room}
                        index={index}
                        showRemoveButton={rooms.length > 1}
                    />
                ))}
            </Box>
            {rooms.length < initialRooms.length && (
                <Box className="add_room_btn" >
                    <Button variant="outlined" color="primary" onClick={addRoom}>
                        <AddOutlinedIcon /> Add Another Room
                    </Button>
                </Box>
            )}
            <Box className='inline_modal_footer'>
                <Button onClick={handleClose}>Done</Button>
            </Box>
        </Box>
    )
}
