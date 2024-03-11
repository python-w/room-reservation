import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { Box, Button, Typography } from '@mui/material';

export default function StyledDateRangePicker({ selectedRange, handleDateChange, handleClose }) {
    return (
        <>
            <Box className='inline_modal'>
                <Typography variant="h6" component="h2">
                    Select Dates
                </Typography>
                <Box className='inline_modal_body'>
                    <DateRangePicker
                        staticRanges={[]}
                        inputRanges={[]}
                        onChange={handleDateChange}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={selectedRange}
                        direction="horizontal"
                        showMonthAndYearPickers={false}
                        dateDisplayFormat="E, MMM d"
                        showDateDisplay={false}
                    />
                </Box>
                <Box className='inline_modal_footer'>
                    <Button onClick={handleClose}>Done</Button>
                </Box>
            </Box>
        </>
    )
}
