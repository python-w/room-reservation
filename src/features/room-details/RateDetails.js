import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

export default function RateDetails({ room }) {
    return (
        <div className="card-body">
            <div className="rate-dInner">
                <h6 className="card-heading">
                    Rate Details
                </h6>
                <FormControl className="rateFormControl">
                    <RadioGroup defaultValue="Rate #1" name="rate-selection-radio">
                        {room.rates.map((room, index) =>
                            <FormControlLabel
                                key={index}
                                value={room.label}
                                control={<Radio />}
                                label={
                                    <span className="rateSelectionLabel">
                                        <span>
                                            {room.label}
                                        </span>
                                        <span>
                                            ${room.rate}.00
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
                    <Typography variant="p" component="p" className="card-heading-small">
                        Rate Breakdown
                    </Typography>
                    <div className="dRateBD">
                        <Typography variant="p" component="p" className="rateBDLabel">
                            <Typography variant="p" component="span">
                                Rate:
                            </Typography>
                            <Typography className="rateBDPrice" variant="p" component="span">
                                $250.00
                            </Typography>
                        </Typography>
                        <Typography variant="p" component="p" className="rateBDLabel">
                            <Typography variant="p" component="span">
                                Discount:
                            </Typography>
                            <Typography className="rateBDPrice" variant="p" component="span">
                                $0.00
                            </Typography>
                        </Typography>
                        <Typography variant="p" component="p" className="rateBDLabel">
                            <Typography variant="p" component="span">
                                VAT:
                            </Typography>
                            <Typography className="rateBDPrice" variant="p" component="span">
                                $50.00
                            </Typography>
                        </Typography>
                        <Typography variant="p" component="p" className="rateBDLabel">
                            <Typography variant="p" component="span">
                                Grand Total:
                            </Typography>
                            <Typography className="rateBDPrice" variant="p" component="span">
                                $450.00
                            </Typography>
                        </Typography>
                    </div>
                </div>
                <div className="drateTotalPrice">
                    <Typography variant="p" component="span" className="rateTDLabel">
                        Total
                    </Typography>
                    <Typography className="rateTDPrice" variant="p" component="span">
                        $450.00
                    </Typography>
                </div>
            </div>
        </div>
    )
}
