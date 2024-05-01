export async function checkAgeGroup() {
  try {
    const res = await fetch("http://localhost:8080/api/jsonws/northstar-react.roomreservation/get-check-age-group-enabled/");

    if (res.status === 200) {
      return res.ok;
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function getAllAgeGroup() {
  try {
    const res = await fetch("http://localhost:8080/api/jsonws/northstar-react.roomreservation/get-all-age-groups");

    if (res.status === 200) {
      const data = await res.json();
      return data.response;
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
}
