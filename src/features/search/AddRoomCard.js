import RoomCard from "./RoomCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../../contexts/SearchContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useRef } from "react";
import { Box } from "@material-ui/core";


export default function AddRoomCard({ handleCloseModal, roomCardRef }) {

    const refRoomModal = useRef();
    const { state, dispatch } = useSearch();
    const { roomsToSearch, roomsInSearch } = state;

    const addRoom = () => {
        dispatch({ type: 'ADD_ROOM' })
    };


    useOnClickOutside(refRoomModal, () => {
        handleCloseModal()
    })

    return (
        <Box ref={(refRoomModal, roomCardRef)} className='inline_modal'>
            <Box className="inline_modal_body">
                {roomsInSearch.map((room, index) => (
                    <RoomCard
                        key={index}
                        room={room}
                        index={index}
                        showRemoveButton={roomsInSearch.length > 1}
                    />
                ))}
            </Box>
            {roomsInSearch.length < roomsToSearch.length && (
                <Box className="add_room_btn" >
                    <button className="btn btn-wc-outlined" variant="outlined" color="primary" onClick={addRoom}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Another Room
                    </button>
                </Box>
            )}
            <Box className='inline_modal_footer'>
                <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
            </Box>
        </Box>
    )
}
