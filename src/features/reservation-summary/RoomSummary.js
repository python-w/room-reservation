import GuestsSelection from "./GuestsSelection";
import RateSelection from "./RateSelection";
import { formatCurrency } from "../../utils/FormatCurrency";
import { calculateDiscountedAmount } from "../../utils/CalculateDiscountedAmount";
import { calculateDiscountedRoomRate } from "../../utils/CalculateDiscountedRoomRate";
import { calculateVATOnDiscountedRate } from "../../utils/CalculateVATOnDiscountedRate";
import { taxRate } from "../../utils/TaxRate";
import { useSearch } from "../../contexts/SearchContext";
import AgeGroupSelection from "./AgeGroupSelection"
import Error from "../../ui/Error";
import { TbX } from "react-icons/tb";
import { useEffect, useState } from "react";

export default function RoomSummary({ room, index, formErrors, showErrors, validateReservation }) {
  const { state, dispatch } = useSearch();
  const { selectedRooms, roomsInSearch, checkAgeGroupEnabled } = state;

  const selectedRate = room.selectedRate?.value || 0;
  const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount || 0));
  const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount || 0)
  const vat = calculateVATOnDiscountedRate(selectedRate, room.discount || 0, taxRate || 0);
  const formattedVAT = formatCurrency(vat);
  const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));

  const [ageGroupOptions, setAgeGroupOptions] = useState([]);

  useEffect(() => {
    const seenLabels = new Set();
    const newageGroupOptions = roomsInSearch.reduce((acc, room) => {
      const roomLabel = room.ageGroups
        ?.filter((group) => group.count > 0)
        .map((group) => {
          const name = group.count > 1 ? (group.name === "Child" ? "Children" : group.name + "s") : group.name;
          return `${group.count} ${name}`;
        })
        .join(', ');

      if (roomLabel && !seenLabels.has(roomLabel)) {
        seenLabels.add(roomLabel);
        acc.push(roomLabel);
      }
      return acc;
    }, []);

    setAgeGroupOptions(newageGroupOptions);
    
    if (newageGroupOptions.length === 0 || newageGroupOptions.every(option => option === newageGroupOptions[0])) {
      dispatch({
        type: "SELECT_AGEGROUP",
        payload: { bookingId: room.bookingId, ageGroup: newageGroupOptions[0] },
      });
    }
  }, [roomsInSearch]);

  const handleRemoveGuest = (bookingId) => {
    const updateSelectedRooms = selectedRooms.map((room) => {
      if (room.bookingId === bookingId) {
        return {
          ...room,
          reservedFor: null,
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
    <div className={selectedRooms.length > 2 ? "col-md-6" : "col-md-12"}>
      <div className="booked_room_card">
        <div className="card_header">
          <h2>
            Room {index}: {room.title}
          </h2>
          {selectedRooms.length > 1 && <button className="btn_remove_room" onClick={() => handleRemoveRoom(room.bookingId)}><TbX className="react-icon mr-2" /> <span>Remove</span></button>}
        </div>
        <ul>
          <li>
            <div>Reservation for:</div> {!room.guest ? <GuestsSelection bookingId={room.bookingId} validateReservation={validateReservation} /> : <p className="mb-0"><strong>Guest</strong></p>}
            {room.guest &&
              room.guest.map((g, index) => (
                <div key={index} className="guest_card">
                  <ul>
                    <li>
                      <p><span>Name:</span><strong>{g?.guestname}</strong></p>
                    </li>
                    {g.email &&
                      <li>
                        <p><span>Email:</span><strong>{g?.email}</strong></p>
                      </li>
                    }
                    {g.phone &&
                      <li>
                        <p><span>Cell Number:</span><strong>{g?.phone}</strong></p>
                      </li>
                    }
                    {g.homePhone && g.homePhone.length > 6 &&
                      <li>
                        <p><span>Home Phone Number:</span><strong>{g?.homePhone}</strong></p>
                      </li>
                    }
                  </ul>
                  <button className="guest_remove" onClick={() => handleRemoveGuest(room.bookingId)}><TbX className="react-icon" /></button>
                </div>
              ))}
            {showErrors && formErrors[room.bookingId]?.reservedFor && !room.guest && <Error message={formErrors[room.bookingId]?.reservedFor} />}

          </li>
          {checkAgeGroupEnabled &&
            <li>
              <div>No of persons:</div>
              {ageGroupOptions.length > 1 ?
                <>
                  <AgeGroupSelection bookingId={room.bookingId} roomIndex={index} validateReservation={validateReservation} ageGroupOptions={ageGroupOptions} />
                  {showErrors && formErrors[room.bookingId]?.occupants && <Error message={formErrors[room.bookingId]?.occupants} />}
                </>
                :
                <strong>
                  {ageGroupOptions[0]}
                </strong>
              }
            </li>
          }
          <li>
            <div>Per Day Room Charges:</div>
            <RateSelection bookingId={room.bookingId} roomRates={room.rates} validateReservation={validateReservation} />
            {showErrors && formErrors[room.bookingId]?.selectedRate && <Error message={formErrors[room.bookingId]?.selectedRate} />}
          </li>
          <li>
            <div>Value Added Tax (VAT):</div>
            <p><strong>{formattedVAT}</strong></p>
          </li>
          <li>
            <div>Discount Amount:</div>
            <p><strong>{discountedAmount}</strong></p>
          </li>
          <li>
            <div>Total:</div>
            <p><strong>{totalAmount}</strong></p>
          </li>
        </ul>
      </div>
    </div>
  );
}
