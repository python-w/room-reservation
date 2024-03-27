import React, { useState } from 'react'
import GuestsSelection from './GuestsSelection'
import RateSelection from './RateSelection'
import { formatCurrency } from '../../utils/FormatCurrency';
import { calculateDiscountedAmount } from '../../utils/CalculateDiscountedAmount';
import { calculateDiscountedRoomRate } from '../../utils/CalculateDiscountedRoomRate';
import { calculateVATOnDiscountedRate } from '../../utils/CalculateVATOnDiscountedRate';
import { taxRate } from '../../utils/TaxRate';
import { useSearch } from '../../contexts/SearchContext';

export default function BookedRoom({ room, index }) {
    const { state } = useSearch();
    const { searchedRooms, bookedRooms } = state;

    function findSuitableRoom(booking) {
        for (const room of bookedRooms) {
            const totalOccupancy = booking.adults + booking.children;
            if (totalOccupancy <= room.maxOccupancy) {
                room.adultsCount = booking.adults;
                room.childrenCount = booking.children;
                return room;
            }
        }
        return null;
    }

    const bookedRoomSummary = searchedRooms.map(booking => {
        const room = findSuitableRoom(booking);
        return {
            id: room.id,
            adultsCount: room ? room.adultsCount : null,
            childrenCount: room ? room.childrenCount : null
        };
    });

    console.log(bookedRoomSummary);

    const selectedRate = room.selectedRate ? room.selectedRate.rate : 0;
    const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount));
    const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount)
    const vat = calculateVATOnDiscountedRate(selectedRate, room.discount, taxRate);
    const formattedVAT = formatCurrency(vat);
    const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));
    return (
        <div className='col-md-6'>
            <div className='booked_room_card'>
                <h2>Room {index}: {room.roomtype}</h2>
                <ul>
                    <li>Reservation for: <GuestsSelection /></li>
                    <li>No of persons: <strong>{room.adults} {room.adults > 1 ? 'Adults' : 'Adult'}, {room.children} {room.children > 1 ? 'Children' : 'Child'}</strong></li>
                    <li>Per Day Room Charges: <RateSelection roomId={room.id} roomRates={room.rates} /></li>
                    <li>Value Added Tax (VAT): <strong>{formattedVAT}</strong></li>
                    <li>Discount Amount: <strong>{discountedAmount}</strong></li>
                    <li>Total: <strong>{totalAmount}</strong></li>
                </ul>
            </div>
        </div>
    )
}
