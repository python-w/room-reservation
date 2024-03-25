import { Button } from '@mui/material'
import React from 'react'
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useSearch } from '../contexts/SearchContext';

export default function FilterButton() {
    const { dispatch } = useSearch();
    return (
        <Button variant="outlined" onClick={() => { dispatch({ type: 'FILTER_TOGGLE' }) }} startIcon={<SortOutlinedIcon />} className="btn btnc-outlined d-lg-none mb-lg-0 mb-4">
            Filter Results
        </Button>
    )
}
