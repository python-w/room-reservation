import axios from "axios";

export async function getRooms(dispatch) {
  dispatch({ type: "SEARCH_LOADING" });
  try {
    const res = await axios.get("http://localhost:5000/rooms?_page=1");
    const rooms = res.data;

    if (res.status === 200) {
      dispatch({ type: "SEARCH_ROOMS", payload: rooms.data });
    }
  } catch (error) {
    let errorMessage;

    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = "Something went wrong. Please try again";
      }
    } else if (error.message === "Network Error") {
      errorMessage =
        "You are offline. Please check your internet connection and try again.";
    }
    dispatch({ type: "SEARCH_ERROR", payload: errorMessage });
  }
}


export async function createBooking(selectedRooms, comments) {
  try {
    const requestBody = {
      rooms: selectedRooms,
      comments: comments
    };

    const res = await axios.post('http://localhost:5000/bookings', requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.data) throw Error();
    return res.data;
  } catch {
    throw Error("Failed booking your room.");
  }
}
