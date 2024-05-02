import AddGuestModal from './AddGuestModal';
import { Autocomplete } from '@material-ui/lab';
import { Paper, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';

const memberlist = [
    { id: 8405409, name: 'Bob Smith', type: 'Dependents' },
    { id: 8405410, name: 'John Doe', type: 'Dependents' },
    { id: 8405411, name: 'Alice Johnson', type: 'Dependents' },
    { id: 8405412, name: 'Eve Brown', type: 'Dependents' },
    { id: 8405413, name: 'Max Williams', type: 'Dependents' },
    { id: 8405414, name: 'Cob Smith', type: 'Dependents' },
    { id: 8405415, name: 'Sam Lee', type: 'Dependents' },
    { id: 8405416, name: 'Kate Miller', type: 'Dependents' },
    { id: 8405417, name: 'Alex Thompson', type: 'Dependents' },
    { id: 8405418, name: 'Chris White', type: 'Guests' },
    { id: 8405419, name: 'Emma Davis', type: 'Guests' },
    { id: 8405420, name: 'Sophia Wilson', type: 'Guests' },
    { id: 8405421, name: 'Liam Taylor', type: 'Guests' },
    { id: 8405422, name: 'Liam Taylor', type: 'Guests' },
    { id: 8405423, name: 'Liam Taylor', type: 'Guests' },
];


export default function GuestsSelection({ roomId }) {

    const { dispatch } = useSearch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const options = [
        { id: 1234567, name: 'Book for myself', type: 'myself' },
        ...memberlist.map((option) => {
            const groupTitle = option.type;
            return {
                groupTitle,
                ...option,
            };
        })
    ]

    const handleChange = (event, value) => {
        dispatch({ type: "ADD_GUEST", payload: { guestRoomId: roomId,  value } });

        console.log(value)
        // setSelectedOption(value)
        // dispatch({
        //   type: "SELECT_RATE",
        //   payload: { rateRoomId: bookingId, value },
        // });
      };

    return (
        <>
            <Autocomplete
                id="guest_selection"
                options={options.sort((a, b) => -b + a)}
                groupBy={(option) => option.groupTitle}
                getOptionLabel={(option) => option.id === 1234567 ? option.name : `${option.id} - ${option.name}`}
                renderInput={(params) => <TextField {...params} placeholder="Search and select member" />}
                onChange={handleChange}
                renderGroup={(params) => (
                    <li key={params.key}>
                        <div className='guest_group_title'>{params.group}</div>
                        <ul className='guest_group_members'>{params.children}</ul>
                    </li>
                )}
                PaperComponent={({ children }) => {
                    return (
                        <Paper className='guest_selection_outer'>
                            <div className='add_guest_btn'>
                                <button className='btn btn-wc-outlined'
                                    onMouseDown={() => {
                                        handleOpen()
                                    }}
                                >
                                    Add New Guest
                                </button>
                            </div>
                            {children}
                        </Paper>
                    );
                }}
            />

            <AddGuestModal open={open} handleOpen={handleOpen} handleClose={handleClose} roomId={roomId} />

        </>
    );
}



