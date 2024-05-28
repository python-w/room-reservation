import RoomCard from "./RoomCard";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useCallback, useRef } from "react";
import { Box } from "@material-ui/core";

export default function AddRoomCard({ handleCloseModal, roomCardRef, ageGroupLoading, ageGroupTypeMaxOccupants }) {
    const refRoomModal = useRef(null);
    useOnClickOutside(refRoomModal, () => {
        handleCloseModal()
    })

    const combinedRef = useCallback(node => {
        if (node !== null) {
            refRoomModal.current = node;
            roomCardRef.current = node;
        }
    }, [roomCardRef]);
    
    return (
        <Box ref={combinedRef} className='inline_modal'>
            <RoomCard
                ageGroupTypeMaxOccupants={ageGroupTypeMaxOccupants}
                handleCloseModal={handleCloseModal}
                ageGroupLoading={ageGroupLoading}
            />
        </Box>
    )
}
