import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, FormControlLabel, FormControl, Radio, RadioGroup } from "@mui/material";
import roomImg from "../images/room-detail-img.png";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Fancybox from "../ui/ListingFancyBox";
import ListingCarousel from "../ui/ListingCarousel";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow: theme.palette.mode === "dark" ? "0 0 0 1px rgb(16 22 26 / 40%)" : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage: theme.palette.mode === "dark" ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))" : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpRadio(props) {
  return <Radio disableRipple color="default" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
}

export default function RoomDetails() {
  return (
    <div className="DetailingPage">
      <button className="btn btn-wc-transparent btn-back">
        <ChevronLeft />
        See Other Options
      </button>
      <div className="row">
        <div className="col-12">
          <div className="ListingFancyB">
            <Fancybox>
              <ListingCarousel showPageCount={true} options={{ infinite: false, Thumbs: false }}>
                <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                  <img className="dcard-img img-fluid" alt="" src={roomImg} width="100" height="300" />
                </div>
                <div className="f-carousel__slide" data-fancybox="gallery" data-src="https://lipsum.app/id/64/1600x1200">
                  <img className="dcard-img img-fluid" alt="" src="https://lipsum.app/id/64/400x300" width="400" height="300" />
                </div>
                <div className="f-carousel__slide" data-fancybox="gallery" data-src={roomImg}>
                  <img className="dcard-img img-fluid" alt="" src={roomImg} width="900" height="300" />
                </div>
              </ListingCarousel>
            </Fancybox>
          </div>
          <div className="room-bio">
            <Typography variant="h3" component="h3" className="card-title">
              Royal Suite, Executive lounge access, Suite, 1 King
            </Typography>
            <p className="card-text" style={{ alignItems: "center", display: "flex" }}>
              <LocationOnOutlinedIcon />
              1600 Northstar dr. Atlanta, GA 30012
            </p>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card room-details">
            <div className="card-body">
              <Typography variant="h6" component="h6" className="card-heading">
                Room Details
              </Typography>
              <p className="card-description">Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-suite bathroom with a rejuvenating shower. Your perfect retreat awaits!</p>
              <div className="damenities-card damenities-card-01">
                <strong>Amenities Included</strong>
                <ul>
                  <li>Free Wi-Fi</li>
                  <li>Breakfast</li>
                  <li>Daily housekeeping</li>
                  <li>On-site restaurant and bar</li>
                  <li>Swimming pool</li>
                  <li>Fitness center</li>
                  <li>Concierge service</li>
                </ul>
              </div>
              <div className="damenities-card damenities-card-02">
                <strong>Restrictions</strong>
                <ul>
                  <li>No Pets Allowed</li>
                  <li>No Smoking</li>
                  <li>Guests Not Allowed</li>
                </ul>
              </div>
              <div className="damenities-card damenities-card-03">
                <strong>Room Features</strong>
                <ul>
                  <li>2 Double beds</li>
                  <li>1 attached bathroom</li>
                  <li>1 attached Balcony</li>
                  <li>City View</li>
                </ul>
              </div>
              <div className="damenities-card damenities-card-04">
                <strong>Additional Details</strong>
                <ul>
                  <li>Check-In at 2 PM</li>
                  <li>Check-Out at 11 AM</li>
                  <li>Shuttle available on request</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 rateDMain">
          <div className="card rate-details">
            <div className="card-body">
              <div className="rate-dInner">
                <Typography variant="h6" component="h6" className="card-heading">
                  Rate Details
                </Typography>
                <FormControl className="rateFormControl">
                  <RadioGroup defaultValue="$250.00" name="rate-selection-radio">
                    <FormControlLabel
                      value="$250.00"
                      control={<BpRadio />}
                      label={
                        <Typography variant="p" component="p" className="rateSelectionLabel">
                          <Typography variant="p" component="span">
                            Rate #1
                          </Typography>
                          <Typography className="rateSPrice" variant="p" component="span">
                            $250.00
                          </Typography>
                        </Typography>
                      }
                      className="rateFormLabel"
                    />
                    <FormControlLabel
                      value="$350.00"
                      control={<BpRadio />}
                      label={
                        <Typography variant="p" component="p" className="rateSelectionLabel">
                          <Typography variant="p" component="span">
                            Rate #2
                          </Typography>
                          <Typography className="rateSPrice" variant="p" component="span">
                            $350.00
                          </Typography>
                        </Typography>
                      }
                      className="rateFormLabel"
                    />
                    <FormControlLabel
                      value="$450.00"
                      control={<BpRadio />}
                      label={
                        <Typography variant="p" component="p" className="rateSelectionLabel">
                          <Typography variant="p" component="span">
                            Rate #3
                          </Typography>
                          <Typography className="rateSPrice" variant="p" component="span">
                            $450.00
                          </Typography>
                        </Typography>
                      }
                      className="rateFormLabel"
                    />
                    <FormControlLabel
                      value="$550.00"
                      control={<BpRadio />}
                      label={
                        <Typography variant="p" component="p" className="rateSelectionLabel">
                          <Typography variant="p" component="span">
                            Rate #4
                          </Typography>
                          <Typography className="rateSPrice" variant="p" component="span">
                            $550.00
                          </Typography>
                        </Typography>
                      }
                      className="rateFormLabel"
                    />
                    <FormControlLabel
                      value="$650.00"
                      control={<BpRadio />}
                      label={
                        <Typography variant="p" component="p" className="rateSelectionLabel">
                          <Typography variant="p" component="span">
                            Rate #5
                          </Typography>
                          <Typography className="rateSPrice" variant="p" component="span">
                            $650.00
                          </Typography>
                        </Typography>
                      }
                      className="rateFormLabel"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="breakDMain">
                <div className="drateBreakDown">
                  <Typography variant="p" component="p" className="card-heading-small">
                    Rate Breakdown
                  </Typography>
                  <div className="dRateBD">
                    <Typography variant="p" component="p" className="rateBDLabel">
                      <Typography variant="p" component="span">
                        Rate:
                      </Typography>
                      <Typography className="rateBDPrice" variant="p" component="span">
                        $400.00
                      </Typography>
                    </Typography>
                    <Typography variant="p" component="p" className="rateBDLabel">
                      <Typography variant="p" component="span">
                        Discount:
                      </Typography>
                      <Typography className="rateBDPrice" variant="p" component="span">
                        $0.00
                      </Typography>
                    </Typography>
                    <Typography variant="p" component="p" className="rateBDLabel">
                      <Typography variant="p" component="span">
                        VAT:
                      </Typography>
                      <Typography className="rateBDPrice" variant="p" component="span">
                        $50.00
                      </Typography>
                    </Typography>
                    <Typography variant="p" component="p" className="rateBDLabel">
                      <Typography variant="p" component="span">
                        Grand Total:
                      </Typography>
                      <Typography className="rateBDPrice" variant="p" component="span">
                        $450.00
                      </Typography>
                    </Typography>
                  </div>
                </div>
                <div className="drateTotalPrice">
                  <Typography variant="p" component="span" className="rateTDLabel">
                    Total
                  </Typography>
                  <Typography className="rateTDPrice" variant="p" component="span">
                    $500.00
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

