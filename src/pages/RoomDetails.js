import ChevronLeft from "@material-ui/icons/ChevronLeft";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Fancybox from "../ui/ListingFancyBox";
import ListingCarousel from "../ui/ListingCarousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { additionalIcons, amenityIcons, featureIcons, restrictionIcons } from '../utils/Icons'
import RateDetails from "../features/room-details/RateDetails";
import generateGoogleMapsUrl from "../utils/generateGoogleMapsUrl";
import extractAmenities from "../utils/extractAmenities";

export default function RoomDetails() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useSearch();
  const { availableRooms } = state;
  const room = availableRooms.filter(room => room.roomId === roomId)[0];

  //Google Maps
  const googleMapsUrl = generateGoogleMapsUrl(room?.address);

  //Amenities
  const amenities = extractAmenities(room);


  return (
    <div className="container">
      {room &&
        <div className="detail_page">
          <button onClick={() => navigate(-1)} className="btn btn-wc-transparent btn-back">
            <ChevronLeft />
            See Other Options
          </button>
          <div className="roomThumb">
            <Fancybox>
              <ListingCarousel showPageCount={true} options={{ infinite: false, Thumbs: false }}>
                {room.images.thumbs.map((thumb, i) => (
                  <div className="f-carousel__slide" data-fancybox="gallery" data-src={room.images.large[i]} key={i}>
                    <img className="dcard-img img-fluid" alt="" src={thumb} width="100" height="300" />
                  </div>
                ))}
              </ListingCarousel>
            </Fancybox>
          </div>
          <div className="room-bio">
            <h3 className="card-title">
              {room.name}
            </h3>
            {room?.address?.addressLine1 &&
              <Link to={googleMapsUrl} target="_blank" className="card-address" style={{ alignItems: "center", display: "flex" }}>
                <LocationOnOutlinedIcon />
                {`${room?.address?.addressLine1}, ${room?.address?.state}, ${room?.address?.postalCode}`}
              </Link>
            }
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card room-details">
                <div className="card-body">
                  <h5 className="card-heading">
                    Room Details
                  </h5>
                  <div className="card-description">
                    <p>{room.description}</p>
                  </div>
                  {amenities &&
                    <div className="damenities-card damenities-card-01">
                      <strong>Amenities Included</strong>
                      <ul>
                        {amenities.map((el, index) =>
                          <li key={index}>
                            {el in amenityIcons && amenityIcons[el]}
                            {el}
                          </li>
                        )}
                      </ul>
                    </div>
                  }
                  {room.restrictions &&
                    <div className="damenities-card damenities-card-02">
                      <strong>Restrictions</strong>
                      <ul>
                        {room.restrictions.map((el, index) =>
                          <li key={index}>
                            {el in restrictionIcons && restrictionIcons[el]}
                            {el}
                          </li>)}
                      </ul>
                    </div>
                  }
                  {room.roomFeatures &&
                    <div className="damenities-card damenities-card-03">
                      <strong>Room Features</strong>
                      <ul>
                        {room.roomFeatures.map((el, index) =>
                          <li key={index}>
                            {el in featureIcons && featureIcons[el]}
                            {el}
                          </li>)}
                      </ul>
                    </div>
                  }
                  {room.additionalDetails &&
                    <div className="damenities-card damenities-card-04">
                      <strong>Additional Details</strong>
                      <ul>
                        {room.additionalDetails.map((el, index) =>
                          <li key={index}>
                            {el in additionalIcons && additionalIcons[el]}
                            {el}
                          </li>)}
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-4 rateDMain">
              <div className="card rate-details">
                {/* <RateDetails room={room} key={room.roomId} /> */}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
