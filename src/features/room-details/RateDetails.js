import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { formatCurrency } from '../../utils/FormatCurrency';
import { calculateDiscountedAmount } from '../../utils/CalculateDiscountedAmount';
import { calculateVATOnDiscountedRate } from '../../utils/CalculateVATOnDiscountedRate';
import { calculateDiscountedRoomRate } from '../../utils/CalculateDiscountedRoomRate';
import { taxRate } from '../../utils/TaxRate';

export default function RateDetails({ room }) {
    const rateArray = Object.entries(room.rateMap);
    const defaultRate = rateArray[0][1];

    const [selectedRate, setSelectedRate] = useState(defaultRate);
    const formattedRate = formatCurrency(selectedRate);
    const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedRate, room.discount || 0));
    const discountedRate = calculateDiscountedRoomRate(selectedRate, room.discount || 0)
    const vat = calculateVATOnDiscountedRate(selectedRate, room.discount || 0, taxRate || 0);
    const formattedVAT = formatCurrency(vat);
    const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));

    const handleChange = (event) => {
        setSelectedRate(event.target.value);
    };

    return (
        <div className="card-body">
            <div className="rate-dInner">
                <h6 className="card-heading">
                    Rate Details
                </h6>
                <FormControl className="rateFormControl">
                    <RadioGroup name="rate-selection-radio" defaultValue={selectedRate}>
                        {room.rateMap && Object.entries(room.rateMap).map(([key, value], index) => (
                            <FormControlLabel
                                key={index}
                                value={value}
                                control={<Radio />}
                                onChange={handleChange}
                                label={
                                    <div className="rate_selection_listbox">
                                        <span>Rate # {index + 1}</span>
                                        <span>{formatCurrency(value)}</span>
                                    </div>
                                }
                            />
                        ))}
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
                    <Typography className="rateTDPrice" component="span">
                        {totalAmount}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
