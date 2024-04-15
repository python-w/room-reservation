import { Box } from "@mui/material";
import RoomCard from "./RoomCard";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSearch } from "../../contexts/SearchContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useRef } from "react";


export default function AddRoomCard({ handleCloseModal }) {

    const refRoomModal = useRef();
    const { dispatch } = useSearch();

    const addRoom = () => {
        dispatch({ type: 'ADD_ROOM' })
    };


    useOnClickOutside(refRoomModal, () => {
        handleCloseModal()
    })

    return (
        <Box ref={refRoomModal} className='inline_modal'>
            <Box className="inline_modal_body">
                <RoomCard />
            </Box>
            <Box className="add_room_btn" >
                <button className="btn btn-wc-outlined" variant="outlined" color="primary" onClick={addRoom}>
                    <AddOutlinedIcon /> Add Another Room
                </button>
            </Box>
            <Box className='inline_modal_footer'>
                <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
            </Box>
        </Box>
    )
}
