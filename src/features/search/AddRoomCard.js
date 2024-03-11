import { Box, Button } from "@mui/material";
import RoomCard from "./RoomCard";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function AddRoomCard({ handleClose, rooms, addRoom, removeRoom, initialRooms, adultsCount, childrenCount, handleAddChildren, handleMinusChildren, handleAddAdults, handleMinusAdults }) {
    return (
        <Box className='inline_modal'>
            <Box className="inline_modal_body">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        room={room}
                        index={index}
                        adultsCount={adultsCount}
                        childrenCount={childrenCount}
                        handleAddChildren={handleAddChildren}
                        handleMinusChildren={handleMinusChildren}
                        handleAddAdults={handleAddAdults}
                        handleMinusAdults={handleMinusAdults}
                        onRemove={() => removeRoom(room)}
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
