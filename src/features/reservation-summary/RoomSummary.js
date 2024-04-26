import GuestsSelection from "./GuestsSelection";
import RateSelection from "./RateSelection";
import { formatCurrency } from "../../utils/FormatCurrency";
import { calculateDiscountedAmount } from "../../utils/CalculateDiscountedAmount";
import { calculateDiscountedRoomRate } from "../../utils/CalculateDiscountedRoomRate";
import { calculateVATOnDiscountedRate } from "../../utils/CalculateVATOnDiscountedRate";
import { taxRate } from "../../utils/TaxRate";

export default function RoomSummary({ room, index }) {

  const selectedRate = room.selectedRate?.value || 0;
  const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount || 0));
  const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount || 0)
  const vat = calculateVATOnDiscountedRate(selectedRate, room.discount || 0, taxRate || 0);
  const formattedVAT = formatCurrency(vat);
  const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));

  return (
    <div className="col-md-6">
      <div className="booked_room_card">
        <h6>
          Room {index}: {room.roomtype}
        </h6>
        <ul>
          <li>
            Reservation for: <GuestsSelection roomId={room.id} />
            {room.guests &&
              room.guests.map((guest, index) => (
                <ul key={index}>
                  <li>
                    Name: <strong>{guest.guestname}</strong>
                  </li>
                  <li>
                    Email: <strong>{guest.email}</strong>
                  </li>
                  <li>
                    Phone Number: <strong>{guest.phone}</strong>
                  </li>
                </ul>
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
