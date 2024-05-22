import AddGuestModal from './AddGuestModal';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import useAPI from '../../hooks/useAPI'
import Spinner from '../../ui/Spinner';

export default function GuestsSelection({ bookingId, validateReservation }) {
    const { loading, sendRequest } = useAPI();
    const [dependents, setDependents] = useState([]);
    const memberId = '2434';
    useEffect(() => {
        const fetchData = async () => {
            const response = await sendRequest({
                url: "http://localhost:8080/api/jsonws/northstar-react.roomreservation/get-dependents-by-type/member-id/2434",
                method: 'GET'
            });
            setDependents(response.response)
        };

        fetchData();
    }, []);

    const { dispatch } = useSearch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const options = [
        { memberId: 1234567, displayName: 'Book for myself', dependentType: 'myself' },
        ...dependents.flatMap((option) => {
            const groupTitle = option.dependentType;
            if (option.dependentList) {
                return option.dependentList.map(dependent => ({
                    groupTitle,
                    ...dependent,
                }));
            } else {
                return [];
            }
        })
    ]

    useEffect(() => {
        validateReservation();
    }, [selectedOption]);

    const handleChange = (event, value) => {
        setSelectedOption(value)
        dispatch({
            type: "RESERVED_FOR",
            payload: { bookingId, value },
        });
    };

    return (
        <>
            {memberId === "0" ?
                <button className='btn btn-wc-outlined mt-0'
                    onMouseDown={() => {
                        handleOpen()
                    }}
                >
                    Add Guest
                </button>
                :
                <Autocomplete
                    id="guest_selection"
                    options={options.sort((a, b) => -b + a)}
                    groupBy={(option) => option.groupTitle}
                    value={selectedOption}
                    getOptionSelected={(option, value) => option.memberId === value.memberId}
                    getOptionLabel={(option) => option.memberId === 1234567 ? option.displayName : `${option.memberId} - ${option.displayName}`}
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
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </Paper>
                        );
                    }}
                />
            }
            <AddGuestModal open={open} handleOpen={handleOpen} handleClose={handleClose} bookingId={bookingId} validateReservation={validateReservation} />

        </>
    );
}



