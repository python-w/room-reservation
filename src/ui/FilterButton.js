import { Button } from '@mui/material'
import React from 'react'
import { useRooms } from '../contexts/RoomsContext'
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

export default function FilterButton() {
    const { dispatch } = useRooms();
    return (
        <Button variant="outlined" onClick={() => { dispatch({ type: 'FILTER_TOGGLE' }) }} startIcon={<SortOutlinedIcon />} className="btn btnc-outlined d-lg-none mb-lg-0 mb-4">
            Filter Results
        </Button>
    )
}
