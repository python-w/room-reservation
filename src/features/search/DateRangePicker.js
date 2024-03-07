import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import { addDays } from 'date-fns';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import BasicModal from '../../ui/BasicModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
            <BasicModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

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
            </BasicModal>
        </>
    )
}
