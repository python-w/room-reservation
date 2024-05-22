import { CircularProgress } from "@material-ui/core";

export default function Spinner() {
    return (
        <div className="spinner">
            <CircularProgress size={32} thickness={4} />
        </div>
    )
}
