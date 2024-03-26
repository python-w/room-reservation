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
    const { selectedRate } = state;
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
