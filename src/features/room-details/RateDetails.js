import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { formatCurrency } from '../../utils/FormatCurrency';
import { calculateDiscountedAmount } from '../../utils/CalculateDiscountedAmount';
import { calculateVATOnDiscountedRate } from '../../utils/CalculateVATOnDiscountedRate';
import { calculateDiscountedRoomRate } from '../../utils/CalculateDiscountedRoomRate';
import { taxRate } from '../../utils/TaxRate';

export default function RateDetails({ room }) {
    const [selectedRate, setSelectedRate] = useState(room.rates[0].rate);
    const formattedRate = formatCurrency(selectedRate);
    const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount));
    const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount)
    const vat = calculateVATOnDiscountedRate(selectedRate, room.discount, taxRate);
    const formattedVAT = formatCurrency(vat);
    const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));

    return (
        <div className="card-body">
            <div className="rate-dInner">
                <h6 className="card-heading">
                    Rate Details
                </h6>
                <FormControl className="rateFormControl">
                    <RadioGroup defaultValue={room.rate} name="rate-selection-radio">
                        {room.rates.map((room, index) =>
                            <FormControlLabel
                                key={index}
                                value={room.rate}
                                control={<Radio />}
                                onChange={(e) => setSelectedRate(e.target.value)}
                                label={
                                    <span className="rateSelectionLabel">
                                        <span>
                                            {room.label}
                                        </span>
                                        <span>
                                            {formatCurrency(room.rate)}
                                        </span>
                                    </span>
                                }
                                className="rateFormLabel"
                            />
                        )}
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="breakDMain">
                <div className="drateBreakDown">
                    <p className="card-heading-small">
                        Rate Breakdown
                    </p>
                    <ul className="dRateBD">
                        <li>
                            <span>Rate:</span>
                            <span>{formattedRate}</span>
                        </li>
                        <li>
                            <span>Discount:</span>
                            <span>{discountedAmount}</span>
                        </li>
                        <li>
                            <span>VAT:</span>
                            <span>{formattedVAT}</span>
                        </li>
                        <li>
                            <span>Grand Total:</span>
                            <span>{totalAmount}</span>
                        </li>
                    </ul>
                </div>
                <div className="drateTotalPrice">
                    <span className="rateTDLabel">
                        Total
                    </span>
                    <Typography className="rateTDPrice" variant="p" component="span">
                        {totalAmount}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
