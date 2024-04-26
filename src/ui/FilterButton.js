import { Button } from '@material-ui/core'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '../contexts/SearchContext';

export default function FilterButton() {
    const { dispatch } = useSearch();
    return (
        <Button variant="outlined" onClick={() => { dispatch({ type: 'FILTER_TOGGLE' }) }} startIcon={<FontAwesomeIcon icon={faFilter} />
        } className="btn btn-wc-outlined d-lg-none mb-lg-0 mb-4">
            Filter Results
        </Button>
    )
}
