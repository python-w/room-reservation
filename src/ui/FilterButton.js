import { Button } from '@material-ui/core'
import React from 'react'
import { useSearch } from '../contexts/SearchContext';
import { TbFilter } from 'react-icons/tb';

export default function FilterButton() {
    const { dispatch } = useSearch();
    return (
        <Button variant="outlined" onClick={() => { dispatch({ type: 'FILTER_TOGGLE' }) }} startIcon={<TbFilter className='react-icon' />
        } className="btn btn-wc-outlined d-lg-none mb-lg-0 mb-4">
            Filter Results
        </Button>
    )
}
