
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import RoomDetailsFancybox from "../ui/RoomDetailsFancyBox";
import ListingCarousel from "../ui/ListingCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { additionalIcons, amenityIcons, featureIcons, restrictionIcons } from '../utils/Icons';
import RateDetails from "../features/room-details/RateDetails";
import generateGoogleMapsUrl from "../utils/generateGoogleMapsUrl";
import extractAmenities from "../utils/extractAmenities";
import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import { Alert } from "@material-ui/lab";
import AgeGroupSelection from "../features/reservation-summary/AgeGroupSelection";


export default function RoomDetails() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useSearch();
  const { availableRooms, checkAgeGroupEnabled } = state;
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (availableRooms.length === 0) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const response = await Axios.get(
            `http://localhost:5000/rooms?roomId=${roomId}`
          );
          setRoom(response.data[0]);
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          setError(error.message)
        }
      };
      fetchData();
    } else {
      setRoom(availableRooms.find(room => room.roomId === roomId));
    }
  }, [roomId, availableRooms]);

  //Google Maps
  const googleMapsUrl = generateGoogleMapsUrl(room?.address);

  //Amenities
  const amenities = extractAmenities(room);


  return (
    <>
      {isLoading && !error && <div className="circularProgress_wrap"><CircularProgress /></div>}
      {error && (
        <Alert severity="error" className="mt-5">
          {error}
        </Alert>
      )}
      {room &&
        <div className="detail_page">
          {availableRooms.length > 0 &&
            <button onClick={() => navigate(-1)} className="btn btn-wc-transparent btn-back">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Go Back
            </button>
          }
          <div className="roomThumb">
            <RoomDetailsFancybox>
              <ListingCarousel showPageCount={true} options={{ infinite: false, Thumbs: false }}>
                {room.images.large.map((img, i) => (
                  <div className="f-carousel__slide" data-fancybox="gallery" data-src={room.images.large[i]} key={i}>
                    <img className="dcard-img img-fluid" alt="" src={img} width="100" height="300" />
                  </div>
                ))}
              </ListingCarousel>
            </RoomDetailsFancybox>
          </div>
          <div className="room-bio">
            <h3 className="card-title">
              {room.name}
            </h3>
            {room?.address?.addressLine1 &&
              <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="card-address">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {`${room?.address?.addressLine1}, ${room?.address?.state}, ${room?.address?.postalCode}`}
              </a>
            }
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card room-details">
                <div className="card-body">
                  <h5 className="card-heading">
                    Room Details
                  </h5>
                  <div className="card-description" dangerouslySetInnerHTML={{ __html: room.onlineDescription }}></div>
                  {amenities.length > 0 &&
                    <div className="damenities-card damenities-card-01">
                      <p><strong>Amenities Included</strong></p>
                      <ul>
                        {amenities.map((el, index) =>
                          <li key={index}>
                            {el in amenityIcons ? amenityIcons[el] : <FontAwesomeIcon icon={faCheckCircle} />}
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
                            {el in featureIcons ? featureIcons[el] : <FontAwesomeIcon icon={faCheckCircle} />}
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
                            {el in additionalIcons ? additionalIcons[el] : <FontAwesomeIcon icon={faCheckCircle} />}
                            {el}
                          </li>)}
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card rate-details">
                {checkAgeGroupEnabled &&
                  <div className="card-body">
                    <div className="rate-dInner">
                      <h6 className="card-heading">
                        Guests
                      </h6>
                      <AgeGroupSelection bookingId={roomId} />
                    </div>
                  </div>
                }
                <RateDetails room={room} key={room.roomId} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
