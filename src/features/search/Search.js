import { useRef } from "react";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import StyledDateRangePicker from "./DateRangePicker";
import AddRoomCard from "./AddRoomCard";
import { useSearch } from "../../contexts/SearchContext";
import { useEffect, useState } from "react";
import CheckAvailability from "../check-availability/CheckAvailability";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import useScrollToRef from "../../hooks/ScrolltoRef";


export default function Search() {
  const navigate = useNavigate();
  const isBottom = useInfiniteScroll();
  const calendarRef = useRef(null);
  const roomCardRef = useRef(null);

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [roomsModalOpen, setRoomsModalOpen] = useState(false);
  const [openChkAvlModal, setOpenChkAvlModal] = useState(false);

  const { state, dispatch } = useSearch();
  const { startDate, endDate, guests, roomsInSearch, isLoading } = state;

  const checkInDate = format(startDate, 'E, d MMM');
  const checkOutDate = format(endDate, 'E, d MMM');

  useScrollToRef(dateModalOpen, calendarRef);
  useScrollToRef(roomsModalOpen, roomCardRef);

  //Handle Date and Rooms Modal
  const handleDateModalOpen = () => {
    setDateModalOpen((modal) => !modal);
    setRoomsModalOpen(false);
  };
  const handleRoomsModalOpen = () => {
    setRoomsModalOpen((modal) => !modal);
    setDateModalOpen(false);
  };
  const handleCloseModal = () => {
    setDateModalOpen(false);
    setRoomsModalOpen(false);
  };

  //Handle Check Availability Modal
  const handleOpenChkAvlModal = () => setOpenChkAvlModal(true);
  const handleCloseChkAvlModal = () => setOpenChkAvlModal(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPagesFetched, setAllPagesFetched] = useState(false);
  const fetchData = async () => {
    dispatch({ type: "SEARCH_LOADING" });
    try {
      navigate("/searchresults");
      const response = await axios.get(
        `http://localhost:5000/rooms?noOfBeds=1&_page=${page}`
      );
      const totalPages = response.data.pages;
      setTotalPages(totalPages);

      dispatch({ type: "SEARCH_ROOMS", payload: response.data.data });
      if (page >= totalPages) {
        setAllPagesFetched(true);
      }
    } catch (error) {
      dispatch({ type: "SEARCH_ERROR", payload: error.message });
    }
  };
  useEffect(() => {
    if (allPagesFetched) return;
    const handleScroll = async () => {
      if (isBottom && page < totalPages && !allPagesFetched && !isLoading) {
        dispatch({ type: "LOADING_ROOMS" });
        const newPage = page + 1;
        setPage(newPage);
        const response = await axios.get(
          `http://localhost:5000/rooms?noOfBeds=1&_page=${newPage}`
        );
        if (newPage > page) {
          dispatch({ type: "LOADMORE_ROOMS", payload: response.data.data });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [page, isBottom, dateModalOpen]);

  const handleSearch = async () => {
    navigate("/searchresults");
    await fetchData();
  };

  return (
    <>
      <div className="search_wrap">
        <div className="search_wrap_inner">
          <Grid container spacing={2} alignItems={"flex-end"}>
            <Grid item className="search_field date_field">
              <div className="label_group">
                <label>Check In & Out Dates</label>
                <button
                  onClick={handleOpenChkAvlModal}
                  className="btn btn-wc-transparent btn-checkavail"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <span className="d-none d-sm-inline-block">
                    Check Availability
                  </span>
                </button>
              </div>
              <div className="custom_input_outer">
                <div
                  role="button"
                  className="customInputBox customInputBoxCal"
                  onClick={handleDateModalOpen}
                >
                  <div>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    <Typography component="span">{checkInDate}</Typography>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    <Typography component="span">{checkOutDate}</Typography>
                  </div>
                </div>
                {dateModalOpen && (
                  <StyledDateRangePicker calendarRef={calendarRef}
                    handleCloseModal={handleCloseModal} 
                  />
                )}
              </div>
            </Grid>
            <Grid item className="search_field room_field">
              <div>
                <div className="label_group">
                  <label>Guests & Rooms</label>
                </div>
                <div className="custom_input_outer">
                  <div
                    role="button"
                    onClick={handleRoomsModalOpen}
                    className="customInputBox"
                  >
                    <div>
                      <FontAwesomeIcon icon={faUser} />{" "}
                      <Typography component="span">
                        {guests || 1} {guests > 1 ? "Guests" : "Guest"},{" "}
                        {roomsInSearch.length}{" "}
                        {roomsInSearch.length > 1 ? "Rooms" : "Room"}
                      </Typography>
                    </div>
                  </div>
                  {roomsModalOpen && (
                    <AddRoomCard handleCloseModal={handleCloseModal} roomCardRef={roomCardRef} />
                  )}
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className="search_btn_wrap">
                <button onClick={handleSearch} className="btn btn-wc-primary">
                  Search  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="container">
        <CheckAvailability
          handleClose={handleCloseChkAvlModal}
          open={openChkAvlModal}
        />
      </div>
    </>
  );
}
