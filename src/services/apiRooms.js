export async function getRooms() {
    const res = await fetch('http://localhost:5000/rooms');
    const rooms = await res.json();

    if (!res.ok) throw Error('Something went wrong. Please try again later.');

    return rooms;
}

export async function createBooking(bookedRooms) {
    try {
        const res = await fetch('http://localhost:5000/bookings', {
            method: "POST",
            body: JSON.stringify(bookedRooms),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        const data = await res.json();
        return data;
    } catch {
        throw Error("Failed creating your booking");
    }
}