import { useSearch } from "../contexts/SearchContext";
import BookedRoom from "../features/reservation-summary/BookedRoom";
import { Check, ChevronLeft, SearchOutlined } from "@material-ui/icons";
import { Form, useNavigate, redirect, useNavigation } from "react-router-dom";
import { createBooking } from "../services/apiCreateBooking";
import CheckInOutCard from "../ui/CheckInOutCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReservationSummary() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { state, dispatch } = useSearch();
  const { bookedRooms, searchedRooms } = state;
  const isSubmitting = navigation.state === "submitting";
  function adjustRooms(searchedRooms, bookedRooms) {
    for (let searchedRoom of searchedRooms) {
      let maxOccupancy = -1;
      let targetRoomIndex = -1;

      for (let i = 0; i < bookedRooms.length; i++) {
        if (
          !bookedRooms[i].adults &&
          !bookedRooms[i].children &&
          searchedRoom.adults + searchedRoom.children <=
            bookedRooms[i].maxOccupancy
        ) {
          if (bookedRooms[i].maxOccupancy > maxOccupancy) {
            maxOccupancy = bookedRooms[i].maxOccupancy;
            targetRoomIndex = i;
          }
        }
      }

      if (targetRoomIndex !== -1) {
        bookedRooms[targetRoomIndex].adults = searchedRoom.adults;
        bookedRooms[targetRoomIndex].children = searchedRoom.children;
      }
    }
  }

  // Adjust rooms
  adjustRooms(searchedRooms, bookedRooms);

  const handleSearchAgain = () => {
    navigate("/");
    dispatch({ type: "SEARCH_AGAIN" });
  };

  return (
    <div className="container">
      <div className="res_sum">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-wc-transparent btn-back"
        >
          <ChevronLeft />
          Go Back
        </button>
        <h3>Reservation Summary</h3>
        <CheckInOutCard />
        <div className="room_count">
          <span>{bookedRooms.length}</span>{" "}
          {bookedRooms.length > 1 ? "Rooms" : "Room"} selected
        </div>
        <div className="row">
          {bookedRooms.map((room, index) => (
            <BookedRoom key={index} room={room} index={index + 1} />
          ))}
        </div>

        <div className="comments_box">
          <label>Comments</label>
          <textarea placeholder="Write here..."></textarea>
        </div>

        <Form method="POST" className="d-flex summary-book-btn">
          <input
            type="hidden"
            name="bookedRoom"
            value={JSON.stringify(bookedRooms)}
          />
          <button
            onClick={handleSearchAgain}
            className="btn btn-wc-outlined mr-3"
          >
            <SearchOutlined className="mr-2" />
            Search Again
          </button>
          <button type="submit" className="btn">
            {isSubmitting ? (
              <CircularProgress
                sx={{ color: "#fff" }}
                size={20}
                thickness={4}
              />
            ) : (
              <>
                <Check className="mr-2" /> Book Now
              </>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const bookings = {
    ...data,
    bookedRoom: JSON.parse(data.bookedRoom),
  };

  await createBooking(bookings);

  // Do NOT overuse
  // dispatch({ type: "SEARCH_AGAIN" })

  return redirect("/bookings");
}
