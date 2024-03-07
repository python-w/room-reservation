import { styled } from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';
import { get4k } from "../utils/Helper";

const StyledInput = styled(InputBase)(({ theme }) => ({
    fontSize: 16,
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        backgroundColor: "#fff",
        padding: theme.spacing(0, 1.5),
        border: '1px solid #CBCBCB',
        height: '54px',
        borderRadius: 100,
        // vertical padding + font size from searchIcon    
        transition: theme.transitions.create('width'),
        '&:focus': {
            borderColor: 'var(--primary-color)',
            boxShadow: '0 0 0 2px rgba(53, 109, 173, 0.20)'
        },
    },
    [theme.breakpoints.up('xxxl')]: {
        fontSize: get4k(100),
        height: get4k(56),
        '& .MuiInputBase-input': {
            borderRadius: get4k(12),
            padding: `${get4k(8)} ${get4k(12)}`,
            height: get4k(24),
        }
    },
}));

export default StyledInput;