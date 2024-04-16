import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import RoomCard from "./RoomCard";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useSearch } from "../../contexts/SearchContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";

export default function AddRoomCard({
  handleCloseModal,
  ageGroup,
  ageGroupLoading,
  ageGroupError,
  occoccupants
}) {
  const refRoomModal = useRef();
  const { state, dispatch } = useSearch();
  const { roomsInSearch } = state;

  const addRoom = () => {
    dispatch({ type: "ADD_ROOM", payload: { id: uuidv4(), ...occoccupants } });
  };

  useOnClickOutside(refRoomModal, () => {
    handleCloseModal();
  });

  console.log(roomsInSearch);

  return (
    <Box ref={refRoomModal} className="inline_modal">
      {ageGroupLoading ? (
        <div className="circularProgress_wrap">
          <CircularProgress />
        </div>
      ) : (
        <>
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
          <Box className="add_room_btn">
            <button
              className="btn btn-wc-outlined"
              variant="outlined"
              color="primary"
              onClick={addRoom}
            >
              <AddOutlinedIcon /> Add Another Room
            </button>
          </Box>
          <Box className="inline_modal_footer">
            <button className="btn btn-wc-primary" onClick={handleCloseModal}>
              Done
            </button>
          </Box>
        </>
      )}
    </Box>
  );
}
