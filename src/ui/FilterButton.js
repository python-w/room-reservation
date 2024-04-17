import { Button } from '@material-ui/core'
import React from 'react'
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { useSearch } from '../contexts/SearchContext';

export default function FilterButton() {
    const { dispatch } = useSearch();
    return (
        <Button variant="outlined" onClick={() => { dispatch({ type: 'FILTER_TOGGLE' }) }} startIcon={<SortOutlinedIcon />} className="btn btn-wc-outlined d-lg-none mb-lg-0 mb-4">
            Filter Results
        </Button>
    )
}
