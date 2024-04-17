import HotelIcon from "@material-ui/icons/Hotel";
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PoolOutlinedIcon from "@material-ui/icons/PoolOutlined";
import WifiOutlinedIcon from "@material-ui/icons/WifiOutlined";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import SmokingRoomsOutlinedIcon from '@material-ui/icons/SmokingRoomsOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import SmokeFreeOutlinedIcon from '@material-ui/icons/SmokeFreeOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';

export const amenityIcons = {
    "2 Double Beds": <HotelIcon />,
    "Dinner": <LocalDiningIcon />,
    "Swimming Pool": <PoolOutlinedIcon />,
    "Wifi": <WifiOutlinedIcon />,
    "Free Parking": <DriveEtaIcon />,
    "TV": <TvOutlinedIcon />,
    "Air Conditioning": <AcUnitOutlinedIcon />,
    "Bathtub": <BathtubOutlinedIcon />,
    "Smoking": <SmokingRoomsOutlinedIcon />
};

export const restrictionIcons = {
    "No Pets Allowed": <PetsOutlinedIcon />,
    "No Smoking": <SmokeFreeOutlinedIcon />,
}

export const featureIcons = {
    "2 Double beds": <HotelIcon />,
    "1 attached bathroom": <BathtubOutlinedIcon />,
    "City View": <RemoveRedEyeOutlinedIcon />,
}

export const additionalIcons = {
    "Check-In at 2 PM": <AccessTimeOutlinedIcon />,
    "Check-Out at 11 AM": <AccessTimeOutlinedIcon />,
    "Shuttle available on request": <AirportShuttleOutlinedIcon />,
}