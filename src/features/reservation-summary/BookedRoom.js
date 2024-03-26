import React from "react";
import GuestsSelection from "./GuestsSelection";
import RateSelection from "./RateSelection";

export default function BookedRoom({ room, index }) {
  return (
    <div className="col-md-6">
      <div className="booked_room_card">
        <h2>Room {index}: King Size</h2>
        <ul>
          <li>
            Reservation for: <GuestsSelection />
          </li>
          <li>
            No of persons:{" "}
            <strong>
              {room.adults} {room.adults > 1 ? "Adults" : "Adult"}, {room.children} {room.children > 1 ? "Children" : "Child"}
            </strong>
          </li>
          <li>
            Per Day Room Charges: <RateSelection />
          </li>
          <li>
            Other Charges For 2 day(s): <strong>$37.52</strong>
          </li>
          <li>
            Discount Amount: <strong>$0.00</strong>
          </li>
          <li>
            Total: <strong>$277.52</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
