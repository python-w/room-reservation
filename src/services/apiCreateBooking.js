import axios from "axios";

export async function createBooking(bookedRooms) {
  try {
    const res = await axios.post(
      "http://localhost:5000/bookings",
      bookedRooms,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.status === 200) throw Error();
    return res.data;
  } catch (error) {
    let errorMessage = "Failed creating your booking";

    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = "Resource not found";
      } else if (error.response.status === 401) {
        errorMessage = "Unauthorized access";
      }
    } else if (error.message === "Network Error") {
      errorMessage = "You are offline please check your internet connection";
    }

    throw new Error(errorMessage);
  }
}
