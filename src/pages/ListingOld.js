import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import roomImg from "../images/room-img.png";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

export default function RoomListing() {
  return (
    <Box className="ListingPage" sx={{mt:5}}>
      <Grid container spacing={2}>
        <Grid lg={3}></Grid>
        <Grid lg={9}>
          <Card sx={{border: '1px solid var(--wc-border-color)', p: 3, borderRadius: 'calc(var(--borderRadius) * 1px)', boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.05)'}}>
            <Grid container>
              <Grid lg={3}>
                <CardMedia sx={{ height: '100%', borderRadius: 'calc(var(--borderRadius) * 1px)' }} image={roomImg} title="green iguana" />
              </Grid>
              <Grid lg={9}>
                <CardContent>
                  <Typography color="text.success" variant="body2">$100.50 / night</Typography>
                  <Chip color="primary" label="Executive Room" />
                  <Chip color="success" label="Available" />
                  <Typography gutterBottom variant="h6" component="h6">
                    Royal Suite, Executive lounge access, Suite, 1 King
                  </Typography>
                  <Typography component="p" sx={{alignItems: "center", display: 'flex'}}>
                    <LocationOnOutlinedIcon />
                    1600 Northstar dr. Atlanta, GA 30012
                  </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                  </Typography>
                  <Typography component="p">
                    This facility offers:
                  </Typography>
                  <Chip icon={<BedOutlinedIcon />} label="2 Double Beds" />
                  <Chip icon={<DinnerDiningOutlinedIcon />} label="Dinner" />
                  <Chip icon={<PoolOutlinedIcon />} label="Swimming Pool" />
                  <Chip icon={<WifiOutlinedIcon />} label="Wifi" />
                  <Chip icon={<DirectionsCarFilledOutlinedIcon />} label="Free Parking" />
                </CardContent>
                <CardActions>
                  <Link href="#">View More Details</Link>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
