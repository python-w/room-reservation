import { styled } from "@mui/material/styles";
import { get4k } from "../utils/Helper";
import { FormLabel } from "@mui/material";

const StyledLabel = styled(FormLabel)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 'bold',
    padding: '0 15px',
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

export default StyledLabel;