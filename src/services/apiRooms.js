export async function getRooms() {
    try {
        const res = await fetch('http://localhost:5000/rooms?_page=1');
        const rooms = await res.json();

        if (!res.ok) {
            throw Error('Something went wrong. Please try again later.');
        }

        return rooms.data;
    } catch (error) {
        throw Error('Failed to fetch rooms. Please check your internet connection and try again.');
    }
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