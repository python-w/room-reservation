import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { formatCurrency } from '../../utils/FormatCurrency';
import { calculateDiscountedAmount } from '../../utils/CalculateDiscountedAmount';
import { calculateVATOnDiscountedRate } from '../../utils/CalculateVATOnDiscountedRate';
import { calculateDiscountedRoomRate } from '../../utils/CalculateDiscountedRoomRate';
import { taxRate } from '../../utils/TaxRate';
import { Autocomplete } from '@material-ui/lab';

export default function RateDetails({ room }) {

    const [selectedOption, setSelectedOption] = useState(null);

    const discountedAmount = formatCurrency(calculateDiscountedAmount(selectedOption?.value || 0, room.discount || 0));
    const discountedRate = calculateDiscountedRoomRate(selectedOption?.value || 0, room.discount || 0)
    const vat = calculateVATOnDiscountedRate(selectedOption?.value || 0, room.discount || 0, taxRate || 0);
    const formattedVAT = formatCurrency(vat);
    const totalAmount = formatCurrency(Math.ceil(discountedRate + vat));



    const options = Object.entries(room.rateMap).map(([key, value], index) => ({
        label: `Rate # ${index + 1} - ${formatCurrency(value)}`,
        value,
        index,
    }));

    const handleChange = (event, value) => {
        setSelectedOption(value)
        console.log(value)
    };

    return (
        <div className="card-body">
            <div className="rate-dInner">
                <h6 className="card-heading">
                    Rate Details
                </h6>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Select an option" />
                    )}
                    onChange={handleChange}
                    value={selectedOption}
                    getOptionSelected={(option, value) => option.label === value.label}
                    renderOption={(option) => (
                        <>
                            <Radio
                                style={{ marginRight: 12 }}
                                checked={selectedOption && selectedOption.label === option.label}
                                inputProps={{ "aria-label": `Rate ${option.label}` }}
                            />
                            <div className="rate_selection_listbox">
                                <span>Rate # {option.index + 1}</span>
                                <span>{formatCurrency(option.value)}</span>
                            </div>
                        </>
                    )}
                />
            </div>
            <div className="breakDMain">
                <div className="drateBreakDown">
                    <p className="card-heading-small">
                        Rate Breakdown
                    </p>
                    <ul className="dRateBD">
                        <li>
                            <span>Rate:</span>
                            <span>{formatCurrency(selectedOption?.value || 0)}</span>
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
