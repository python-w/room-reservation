import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
    return (
        <div className="spinner">
            <CircularProgress size={40} thickness={4} />
        </div>
    )
}
