import React, { useEffect, useRef } from "react";
import { Box, Button } from "@material-ui/core";
import { useSearch } from "../../contexts/SearchContext";
import { v4 as uuidv4 } from "uuid";
import { TbMinus, TbPlus } from "react-icons/tb";
import Spinner from "../../ui/Spinner";

export default function RoomCard({
  ageGroupTypeMaxOccupants,
  handleCloseModal,
  ageGroupLoading }) {
  const modalBodyRef = useRef(null);
  const { state, dispatch } = useSearch();
  const { allAgeGroupsList, roomsInSearch, searchedRooms, checkAgeGroupEnabled } = state;

  useEffect(() => {
    if (!checkAgeGroupEnabled && roomsInSearch.length === 0) {
      const initialRoom = {
        id: uuidv4(),
        name: "Room # 1",
      };
      dispatch({ type: "ROOM_INITIALIZED", payload: initialRoom });
    }
  }, [])

  const handleAddRoom = () => {
    const newRoomNumber = roomsInSearch.length + 1;
    if (checkAgeGroupEnabled) {
      const newRoom = {
        name: `Room # ${newRoomNumber}`,
        ageGroups: allAgeGroupsList.filter(ageGroup => ageGroupTypeMaxOccupants[ageGroup.ageGroupId] > 0).map((ageGroup, index) => ({
          name: ageGroup.ageGroupName,
          ageGroupId: ageGroup.ageGroupId,
          count: index === 0 ? 1 : 0
        }))
      };
      dispatch({ type: "UPDATE_ROOM_IN_SEARCH", payload: newRoom })
      dispatch({ type: "UPDATE_GUESTS" })
    } else {
      const newRoom = {
        name: `Room # ${newRoomNumber}`,
      };
      dispatch({ type: "UPDATE_ROOM_IN_SEARCH", payload: newRoom })
    }
    setTimeout(() => {
      modalBodyRef.current.scrollTo({
        top: modalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 10);
  };

  const handleRemoveRoom = (id, roomIndex) => {
    const updatedSearchedRooms = searchedRooms.filter((_, index) => index !== roomIndex);
    dispatch({ type: "REMOVE_ROOM_IN_SEARCH", payload: id });
    dispatch({ type: "UPDATE_SEARCHED_ROOM", payload: updatedSearchedRooms })
    dispatch({ type: "UPDATE_GUESTS" })
  };
  
  const filteredAgeGroupTypeMaxOccupants = Object.fromEntries(
    Object.entries(ageGroupTypeMaxOccupants).filter(
      ([ageGroupId, maxOccupancy]) => maxOccupancy !== 0
    )
  );
  
  const handleIncrement = (roomIndex, ageGroupIndex) => {
    const updatedRooms = [...roomsInSearch];
    const maxCount = filteredAgeGroupTypeMaxOccupants[Object.keys(filteredAgeGroupTypeMaxOccupants)[ageGroupIndex]] || 0;
    if (updatedRooms[roomIndex].ageGroups[ageGroupIndex].count < maxCount) {
      updatedRooms[roomIndex].ageGroups[ageGroupIndex].count++;
      dispatch({ type: "UPDATE_SEARCHED_ROOM", payload: updatedRooms })
      dispatch({ type: "UPDATE_GUESTS" })
    }
  };

  const handleDecrement = (roomIndex, ageGroupIndex) => {
    const updatedRooms = [...roomsInSearch];
    if (updatedRooms[roomIndex].ageGroups[ageGroupIndex].count > 0) {
      updatedRooms[roomIndex].ageGroups[ageGroupIndex].count--;
      dispatch({ type: "UPDATE_SEARCHED_ROOM", payload: updatedRooms })
      dispatch({ type: "UPDATE_GUESTS" })
    }
  };


  return (
    <>
      <div ref={modalBodyRef} className="inline_modal_body">
        {roomsInSearch.map((room, roomIndex) => (
          <div key={roomIndex} className="add_room_card">
            <div className="room_card_header">
              <p><strong>Room # {roomIndex + 1}</strong></p>
              {roomsInSearch.length > 1 && (
                <button className="btn btn-wc-transparent" onClick={() => handleRemoveRoom(room.id, roomIndex)}>Remove Room</button>
              )}
            </div>
            {checkAgeGroupEnabled && room.ageGroups.length > 0 &&
              <div className="room_card_body">
                
                {ageGroupLoading && <Spinner />}
                {room.ageGroups.map((ageGroup, ageGroupIndex) => (
                  <Box className="room_row" key={ageGroupIndex}>
                    <span className="p-0">{ageGroup.name}</span>
                    <Box className="room_counter">
                      <Button variant="outlined" onClick={() => handleDecrement(roomIndex, ageGroupIndex)} disabled={(roomIndex === 0 && ageGroupIndex === 0 && ageGroup.count === 1) || (ageGroup.count === 0)}><TbMinus className="react-icon" /></Button>
                      <span>{ageGroup.count || 0}</span>
                      <Button variant="outlined" onClick={() => handleIncrement(roomIndex, ageGroupIndex)} disabled={ageGroup.count === filteredAgeGroupTypeMaxOccupants[Object.keys(filteredAgeGroupTypeMaxOccupants)[ageGroupIndex]]}><TbPlus className="react-icon" /></Button>
                    </Box>
                  </Box>
                ))}
              </div>}
          </div>
        ))}
      </div>      
        <Box className="add_room_btn" >
          <button className="btn btn-wc-outlined" onClick={handleAddRoom}>
          <TbPlus className="react-icon mr-2" />
            Add Another Room
          </button>
        </Box>
      <Box className='inline_modal_footer'>
        <button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
      </Box>
    </>
  )
}
