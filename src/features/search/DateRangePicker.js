import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import { addDays } from 'date-fns';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';

export default function StyledDateRangePicker({ open, handleClose }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        }
    ]);
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="date picker"
                aria-describedby="date picker"
            >
                <Box className='modal_content modal_content_auto_width'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Dates
                    </Typography>
                    <DateRangePicker
                        staticRanges={[]}
                        inputRanges={[]}
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        showMonthAndYearPickers={false}
                        dateDisplayFormat="E, MMM d"
                        showDateDisplay={false}
                    />
                </Box>
            </Modal>
        </>
    )
}