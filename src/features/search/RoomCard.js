import { Box, Button, Grid, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import StyledSelect from "../../ui/StyledSelect";

export default function RoomCard({ room, showRemoveButton, onRemove, adultsCount, childrenCount, handleAddChildren, handleMinusChildren, handleAddAdults, handleMinusAdults }) {
    const options = [
        { value: 'Under 1', label: 'Under 1' },
        { value: 'Under 2', label: 'Under 2' },
        { value: 'Under 3', label: 'Under 3' }
    ];
    return (
        <Box className="add_room_card">
            <Box className="room_card_header">
                <Typography variant="h6" component="h2">
                    Rooms # {room.id}
                </Typography>
                {showRemoveButton && (
                    <Button variant="transparent" onClick={onRemove}>
                        Remove Room
                    </Button>
                )}
            </Box>
            {room.adults !== 0 &&
                <Box className="room_row">
                    <Typography component="p">Adults</Typography>
                    <Box className="room_counter">
                        <Button variant="outlined" onClick={() => handleMinusAdults(room.id)}><RemoveOutlinedIcon></RemoveOutlinedIcon></Button>
                        <Typography component='span'>{adultsCount[room.id] || 1}</Typography>
                        <Button variant="outlined" onClick={() => handleAddAdults(room.id)}><AddOutlinedIcon></AddOutlinedIcon></Button>
                    </Box>
                </Box>
            }
            {room.children !== 0 &&
                <>
                    <Box className="room_row">
                        <Box>
                            <Typography component="p">Children</Typography>
                            <Typography component="small">Age 0 to 17</Typography>
                        </Box>
                        <Box className="room_counter">
                            <Button variant="outlined" onClick={() => handleMinusChildren(room.id)}><RemoveOutlinedIcon></RemoveOutlinedIcon></Button>
                            <Typography component='span'>{childrenCount[room.id] || 0}</Typography>
                            <Button variant="outlined" onClick={() => handleAddChildren(room.id)}><AddOutlinedIcon></AddOutlinedIcon></Button>
                        </Box>
                    </Box>
                    <Grid container>
                        {[...Array(childrenCount[room.id])].map((_, index) => (
                            childrenCount[room.id] &&
                            <Grid item key={index} sm={6}>
                                <Box className="room_row child_age_row">
                                    <Box>
                                        <Typography component="p">Child #{index + 1} Age <span className="required">*</span></Typography>
                                        <StyledSelect
                                            name={`childAge${index}`}
                                            options={options}
                                            selected='Under 1'
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>}
        </Box>
    )
}

