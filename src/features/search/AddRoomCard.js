import RoomCard from "./RoomCard";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useCallback, useRef } from "react";
import { Box } from "@material-ui/core";

export default function AddRoomCard({ handleCloseModal, roomCardRef, ageGroupLoading, checkAgeGroupEnabled, allAgeGroupsList, error }) {
    const refRoomModal = useRef();
    useOnClickOutside(refRoomModal, () => {
        handleCloseModal()
    })

    const combinedRef = useCallback(node => {
        if (node !== null) {
            refRoomModal.current = node;
            roomCardRef.current = node;
        }
    }, []);
    
    return (
        <Box ref={combinedRef} className='inline_modal'>
            <RoomCard
                checkAgeGroupEnabled={checkAgeGroupEnabled}
                allAgeGroupsList={allAgeGroupsList}
                ageGroupTypeMaxOccupants={{ "1": 4, "2": 3, "3": 0, "5": 0 }}
                handleCloseModal={handleCloseModal}
                ageGroupLoading={ageGroupLoading}
                error={error}
            />
        </Box>
    )
}
