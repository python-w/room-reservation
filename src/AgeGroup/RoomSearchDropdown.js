import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const RoomSearchDropdown = ({checkAgeGroupEnabled, allAgeGroupsList, ageGroupTypeMaxOccupants}) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (!allAgeGroupsList || allAgeGroupsList.length === 0) {
          setRooms([
              {
                  name: "Room # 1",
                  ageGroups: []
              }
          ]);
      } else {
          setRooms(prevRooms => {
              const updatedRooms = [...prevRooms];
              if (updatedRooms.length > 0) {
                  updatedRooms[0].ageGroups = allAgeGroupsList.map((ageGroup, index) => ({
                      name: ageGroup.ageGroupName,
                      ageGroupId: ageGroup.ageGroupId,
                      count: index === 0 ? 1 : 0
                  }));
              }
              return updatedRooms;
          });
      }
  }, [allAgeGroupsList]);

  const [selectedRoom, setSelectedRoom] = useState('Room 1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    }
  }, []);

  const hideOnClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const hideOnEscape = (event) => {
    if (event.keyCode === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleAddRoom = () => {
    const newRoomNumber = rooms.length + 1;
    const newRoom = { name: `Room # ${newRoomNumber}`,
                      ageGroups: allAgeGroupsList.map((ageGroup, index) => ({
                        name: ageGroup.ageGroupName,
                        ageGroupId: ageGroup.ageGroupId,
                        count: 0
                      }))
                    };
    setRooms([...rooms, newRoom]);
    setSelectedRoom(newRoom.name);
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = rooms.filter((room, i) => i !== index);
    setRooms(updatedRooms);
    if (selectedRoom === rooms[index].name) {
      setSelectedRoom(updatedRooms[index < updatedRooms.length ? index : index - 1].name);
    } else {
      const adjustedRooms = updatedRooms.map((room, i) => ({ ...room, name: `Room # ${i + 1}` }));
      setRooms(adjustedRooms);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setDropdownOpen(false);
  };

  const handleIncrement = (roomIndex, ageGroupIndex) => {
    const updatedRooms = [...rooms];
    const ageGroupId = allAgeGroupsList[ageGroupIndex].ageGroupId;
    const maxCount = ageGroupTypeMaxOccupants[ageGroupId];
    if (updatedRooms[roomIndex].ageGroups[ageGroupIndex].count < maxCount) {
      updatedRooms[roomIndex].ageGroups[ageGroupIndex].count++;
      setRooms(updatedRooms);
    }
  };

  const handleDecrement = (roomIndex, ageGroupIndex) => {
    const updatedRooms = [...rooms];
    if (updatedRooms[roomIndex].ageGroups[ageGroupIndex].count > 0) {
      updatedRooms[roomIndex].ageGroups[ageGroupIndex].count--;
      setRooms(updatedRooms);
    }
    };
    
    
    
    
    useEffect(() => {
        const handleRoomSearchData = (roomSearchData) => {
            console.log(roomSearchData);
        }
        const collectRoomSearchData = () => {
        const roomSearchData = {
          room: {}
        };
    
        rooms.forEach((room, roomIndex) => {
          roomSearchData.room[`Room ${roomIndex + 1}`] = {};
          room.ageGroups.forEach((ageGroup, ageGroupIndex) => {
            roomSearchData.room[`Room ${roomIndex + 1}`][ageGroup.ageGroupId] = ageGroup.count;
          });
        });
    
        return roomSearchData;
      };
      const roomSearchData = collectRoomSearchData();
      handleRoomSearchData(roomSearchData);
  }, [rooms]);

  return (
    <div className="room-search">
      <input
        value={`${checkAgeGroupEnabled ? rooms.reduce((total, room) => total + room.ageGroups.reduce((acc, ageGroup) => acc + ageGroup.count, 0), 0) + ' Guests & ' : ''} ${rooms.length} ${rooms.length === 1 ? 'Room' : 'Rooms'}`}
        readOnly
        className="inputBox roomSearchInputBox"
        onClick={() => setDropdownOpen(prevState => !prevState)}
      />
      {dropdownOpen && (
        <div className="dropdown" ref={dropdownRef}>
          {rooms.map((room, roomIndex) => (
            <div key={roomIndex} className="room">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong onClick={() => handleSelectRoom(room.name)}>{room.name}</strong>
                {rooms.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => handleRemoveRoom(roomIndex)} style={{ color: '#0000FF', background: 'none', textTransform: 'none' }}>Remove Room</Button>
                  </div>
                )}
              </div>
              {checkAgeGroupEnabled &&
                <div className="age-group-search">
                  <ul>
                  {room.ageGroups.filter(ageGroup => ageGroupTypeMaxOccupants[ageGroup.ageGroupId] !== 0).map((ageGroup, ageGroupIndex) => (
                      <li key={ageGroupIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{ageGroup.name}</span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Button onClick={() => handleDecrement(roomIndex, ageGroupIndex)} variant="outlined" size="small" style={{ padding: '4px', minWidth: 'auto', borderRadius: '50%' }} disabled={(roomIndex === 0 && ageGroupIndex === 0 && ageGroup.count === 1) || (ageGroup.count === 0)}>-</Button>
                          <span>{ageGroup.count || 0}</span>
                          <Button onClick={() => handleIncrement(roomIndex, ageGroupIndex)} variant="outlined" size="small" style={{ padding: '4px', minWidth: 'auto', borderRadius: '50%' }} disabled={ageGroup.count === ageGroupTypeMaxOccupants[allAgeGroupsList[ageGroupIndex].ageGroupId]}>+</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Button onClick={handleAddRoom} style={{ color: '#0000FF', background: 'none', textTransform: 'none', marginBottom: '8px' }}>Add Room</Button>
            <Button onClick={() => setDropdownOpen(false)} variant="contained" style={{ color: '#FFFFFF', backgroundColor: '#0000FF', borderRadius: '999px', textTransform: 'none' }}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSearchDropdown;