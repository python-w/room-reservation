export async function getRooms() {
    const res = await fetch('http://localhost:5000/rooms');
    const rooms = await res.json();

    if (!res.ok) throw Error('Something went wrong. Please try again later.');

    return rooms;
}