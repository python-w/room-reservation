import RoomsWebService from 'com.sibisoft.northstar.ws.api.v1.rooms'; // Adjust the path as per your project structure

async function fetchRoomData(roomId) {
    try {
        const roomData = await RoomsWebService.getRoomByRoomId(roomId);
        console.log(roomData); // Do something with the data
    } catch (error) {
        console.error("Error fetching room data:", error);
    }
}

// Call the function with the roomId
fetchRoomData(roomId);