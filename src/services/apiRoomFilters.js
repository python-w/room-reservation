import axios from 'axios';

export async function getRoomFilters() {
  try {
    const res = await axios.get("http://localhost:5000/roomFilters");

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}