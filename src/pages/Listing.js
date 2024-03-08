import * as React from "react";
import roomImg from "../images/room-img.png";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

export default function RoomListing() {
  return (
    <div className="ListingPage" style={{marginTop:'5rem'}}>
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9">
            <div className="card">
              <div className="row">
                <div className="col-lg-4">
                  <img className="lcard-img img-fluid" src={roomImg} title="green iguana" />
                </div>
                <div className="col-lg-8">
                  <div className="card-body">
                    <div className="price-container">$100.50 <small>/ night</small></div>
                    <div class="status-badges">
                      <span class="badge badge-pill badge-primary">Executive Room</span>
                      <span class="badge badge-pill badge-success">Available</span>
                    </div>
                    <h6 className="card-title">
                      Royal Suite, Executive lounge access, Suite, 1 King
                    </h6>
                    <p className="card-text" style={{alignItems: "center", display: 'flex'}}>
                      <LocationOnOutlinedIcon />
                      1600 Northstar dr. Atlanta, GA 30012
                    </p>
                    <p className="card-desc lcard-desc">
                      Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui...
                    </p>
                    <p className="small-card-title">
                      This facility offers:
                    </p>
                    <span class="badge badge-pill badge-light lbadge-light"><BedOutlinedIcon /> Executive</span>
                    <span class="badge badge-pill badge-light lbadge-light"><DinnerDiningOutlinedIcon /> Available</span>
                    <span class="badge badge-pill badge-light lbadge-light"><PoolOutlinedIcon /> Swimming Pool</span>
                    <span class="badge badge-pill badge-light lbadge-light"><WifiOutlinedIcon /> Wifi</span>
                    <span class="badge badge-pill badge-light lbadge-light"><DirectionsCarFilledOutlinedIcon /> Free Parking</span>
                  </div>
                  <div className="card-footer">
                    <a href="#">View More Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
