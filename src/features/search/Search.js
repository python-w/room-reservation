import { Box, Button, Grid, Typography } from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import StyledLabel from "../../ui/StyledLabel";
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import StyledDateRangePicker from "./DateRangePicker";
import { useState } from "react";

export default function Search() {

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <div className="search_wrap">

            <Grid container spacing={2} alignItems={"flex-end"}>
                <Grid item flex={1}>
                    <Box display="flex" justifyContent={"space-between"} alignItems={"center"} className="label_group">
                        <StyledLabel>Check in & out dates</StyledLabel>
                        <Button><DateRangeOutlinedIcon /> Check Availability</Button>
                    </Box>
                    <Box role="button" className="customInputBox" onClick={handleOpen}>
                        <Box>
                            <TodayOutlinedIcon /> <Typography component="span">Thu 8 Feb</Typography>
                        </Box>
                        <Box>
                            <InsertInvitationOutlinedIcon /> <Typography component="span">Thu 8 Feb</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item flex={1}>
                    <Box>
                        <Box className="label_group">
                            <StyledLabel>Guests & Rooms</StyledLabel>
                        </Box>
                        <Box role="button" onClick={() => alert('test')} className="customInputBox">
                            <Box>
                                <PersonOutlineOutlinedIcon /> <Typography component="span">5 Guests, 2 Rooms</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item>
                    <Box className="search_btn_wrap">
                        <Button>Search <EastOutlinedIcon /></Button>
                    </Box>
                </Grid>
            </Grid>
            <StyledDateRangePicker open={modalOpen} handleClose={handleClose} />
        </div >
    )
}