import { Box, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../../contexts/SearchContext";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default function RoomCard({
	checkAgeGroupEnabled,
	allAgeGroupsList,
	ageGroupTypeMaxOccupants,
	handleCloseModal,
	ageGroupLoading,
	error }) {

	const { state, dispatch } = useSearch();
	const { roomsInSearch, searchedRooms } = state;
	const handleAddRoom = () => {
		const newRoomNumber = roomsInSearch.length + 1;
		const newRoom = {
			name: `Room # ${newRoomNumber}`,
			ageGroups: allAgeGroupsList.map((ageGroup, index) => ({
				name: ageGroup.ageGroupName,
				ageGroupId: ageGroup.ageGroupId,
				count: index === 0 ? 1 : 0
			}))
		};
		dispatch({ type: "UPDATE_ROOM_IN_SEARCH", payload: newRoom })
		dispatch({ type: "UPDATE_GUESTS" })
	};

	const handleRemoveRoom = (id, roomIndex) => {
		const updatedSearchedRooms = searchedRooms.filter((_, index) => index !== roomIndex);
		dispatch({ type: "REMOVE_ROOM_IN_SEARCH", payload: id });
		dispatch({ type: "UPDATE_SEARCHED_ROOM", payload: updatedSearchedRooms })
		dispatch({ type: "UPDATE_GUESTS" })
	};

	const handleIncrement = (roomIndex, ageGroupIndex) => {
		const updatedRooms = [...roomsInSearch];
		const ageGroupId = allAgeGroupsList[ageGroupIndex]?.ageGroupId || 0;
		const maxCount = ageGroupTypeMaxOccupants[ageGroupId] || 0;
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
			{error && <Alert severity="error">{error}</Alert>}
			<div className="inline_modal_body">
				{roomsInSearch.map((room, roomIndex) => (
					<div key={roomIndex} className="add_room_card">
						<div className="room_card_header">
							<p><strong>Room # {roomIndex + 1}</strong></p>
							{roomsInSearch.length > 1 && (
								<button className="btn btn-wc-transparent" onClick={() => handleRemoveRoom(room.id, roomIndex)}>Remove Room</button>
							)}
						</div>
						{checkAgeGroupEnabled &&
							<div className={`${ageGroupLoading ? "loading" : ""} room_card_body`}>
								{ageGroupLoading && !error && <div className="circularProgress_wrap"><CircularProgress /></div>}
								{room.ageGroups.filter(ageGroup => ageGroupTypeMaxOccupants[ageGroup?.ageGroupId] !== 0).map((ageGroup, ageGroupIndex) => (
									<Box className="room_row" key={ageGroupIndex}>
										<span className="p-0">{ageGroup.name}</span>
										<Box className="room_counter">
											<Button variant="outlined" onClick={() => handleDecrement(roomIndex, ageGroupIndex)} disabled={(roomIndex === 0 && ageGroupIndex === 0 && ageGroup.count === 1) || (ageGroup.count === 0)}><FontAwesomeIcon icon={faMinus} /></Button>
											<span>{ageGroup.count || 0}</span>
											<Button variant="outlined" onClick={() => handleIncrement(roomIndex, ageGroupIndex)} disabled={ageGroup.count === ageGroupTypeMaxOccupants[allAgeGroupsList[ageGroupIndex]?.ageGroupId]}><FontAwesomeIcon icon={faPlus} /></Button>
										</Box>
									</Box>
								))}
							</div>}
					</div>
				))}
			</div>
			<Box className="add_room_btn" >
				<button className="btn btn-wc-outlined" onClick={handleAddRoom}>
					<FontAwesomeIcon icon={faPlus} className="mr-2" />
					Add Another Room
				</button>
			</Box>
			<Box className='inline_modal_footer'>
				<button className="btn btn-wc-primary" onClick={handleCloseModal}>Done</button>
			</Box>
		</>
	)
}

