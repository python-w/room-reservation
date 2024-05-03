import GuestsSelection from "./GuestsSelection";
import RateSelection from "./RateSelection";
import { formatCurrency } from "../../utils/FormatCurrency";
import { calculateDiscountedAmount } from "../../utils/CalculateDiscountedAmount";
import { calculateDiscountedRoomRate } from "../../utils/CalculateDiscountedRoomRate";
import { calculateVATOnDiscountedRate } from "../../utils/CalculateVATOnDiscountedRate";
import { taxRate } from "../../utils/TaxRate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../../contexts/SearchContext";

export default function RoomSummary({ room, index }) {

  const { state, dispatch } = useSearch();
  const { selectedRooms } = state;

  const selectedRate = room.selectedRate?.value || 0;
  const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount || 0));
  const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount || 0)
  const vat = calculateVATOnDiscountedRate(selectedRate, room.discount || 0, taxRate || 0);
  const formattedVAT = formatCurrency(vat);
  const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));

  const handleRemoveGuest = (bookingId) => {
    const updateSelectedRooms = selectedRooms.map((room) => {
      if (room.bookingId === bookingId) {
        return {
          ...room,
          guest: null
        };
      }
      return room;
    });
    dispatch({ type: "REMOVE_GUEST", payload: updateSelectedRooms })
  }

  const handleRemoveRoom = (bookingId) => {
    const updatedSelectedRooms = selectedRooms.filter((room) => room.bookingId !== bookingId)
    dispatch({ type: "REMOVE_SELECTED_ROOM", payload: updatedSelectedRooms })
  }

  return (
    <div className="col-md-6">
      <div className="booked_room_card">
        <div className="card_header">
          <h2>
            Room {index}: {room.title}
          </h2>
          {selectedRooms.length > 1 && <button className="btn_remove_room" onClick={() => handleRemoveRoom(room.bookingId)}><FontAwesomeIcon icon={faRemove} className="mr-2" /> <span>Remove</span></button>}
        </div>
        <ul>
          <li>
            Reservation for: {!room.guest ? <GuestsSelection bookingId={room.bookingId} /> : <p className="mb-0"><strong>Guest</strong></p>}
            {room.guest &&
              room.guest.map((g, index) => (
                <div key={index} className="guest_card">
                  <ul>
                    <li>
                      Name: <strong>{g?.guestname}</strong>
                    </li>
                    {g.email &&
                      <li>
                        Email: <strong>{g?.email}</strong>
                      </li>
                    }
                    {g.phone &&
                      <li>
                        Phone Number: <strong>{g?.phone}</strong>
                      </li>
                    }
                  </ul>
                  <button className="guest_remove" onClick={() => handleRemoveGuest(room.bookingId)}><FontAwesomeIcon icon={faRemove} /></button>
                </div>
              ))}
          </li>
          <li>
            No of persons:{" "}
            <strong>
              {room.adults} {room.adults > 1 ? "Adults" : "Adult"},{" "}
              {room.children} {room.children > 1 ? "Children" : "Child"}
            </strong>
          </li>
          <li>
            Per Day Room Charges:{" "}
            <RateSelection bookingId={room.bookingId} roomRates={room.rates} />
          </li>
          <li>
            Value Added Tax (VAT): <strong>{formattedVAT}</strong>
          </li>
          <li>
            Discount Amount: <strong>{discountedAmount}</strong>
          </li>
          <li>
            Total: <strong>{totalAmount}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
