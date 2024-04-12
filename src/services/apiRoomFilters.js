export async function getRoomFilters() {
  try {
    const res = await fetch("http://localhost:5000/roomFilters");
    const filters = await res.json();

    if (res.ok) {
      return filters;
    }
  } catch (error) {
    throw Error("Something went wrong. Please try again later.");
  }
}
