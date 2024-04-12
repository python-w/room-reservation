export async function getRooms(dispatch) {
  dispatch({ type: "SEARCH_LOADING" });
  try {
    const res = await fetch("http://localhost:5000/rooms?_page=1");
    const rooms = await res.json();

    if (res.ok) {
      dispatch({ type: "SEARCH_ROOMS", payload: rooms.data });
    }
  } catch (error) {
    throw Error(
      "You are offline. Please check your internet connection and try again."
    );
  }
}

export async function createBooking(bookedRooms) {
  try {
    const res = await fetch("http://localhost:5000/bookings", {
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
