import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SearchIcon from "@material-ui/icons/Search";
import StyledDateRangePicker from "./DateRangePicker";
import AddRoomCard from "./AddRoomCard";
import { useSearch } from "../../contexts/SearchContext";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import CheckAvailability from "../check-availability/CheckAvailability";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";

export default function Search() {
  const navigate = useNavigate();
  const isBottom = useInfiniteScroll();

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [roomsModalOpen, setRoomsModalOpen] = useState(false);
  const [openChkAvlModal, setOpenChkAvlModal] = useState(false);

  const { state, dispatch } = useSearch();
  const { startDate, endDate, guests, roomsInSearch, isLoading } = state;

  const checkInDate = format(startDate, "E, d MMM");
  const checkOutDate = format(endDate, "E, d MMM");

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
      const response = await axios.get(
        `http://localhost:5000/rooms?noOfBeds=1&_page=${page}`
      );

      dispatch({ type: "SEARCH_ROOMS", payload: response.data.data });
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
        const totalPages = response.data.pages;
        setTotalPages(totalPages);
        if (newPage > page) {
          setAllPagesFetched(true);
          dispatch({ type: "LOADMORE_ROOMS", payload: response.data.data });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, totalPages, dispatch, page, isBottom, allPagesFetched]);

  const handleSearch = async () => {
    navigate("/searchresults");
    await fetchData();
  };

  return (
    <>
      <div className="search_wrap">
        <div className="container">
          <div className="search_wrap_inner">
            <Grid container spacing={2} alignItems={"flex-end"}>
              <Grid item className="search_field date_field">
                <div className="label_group">
                  <label>Check In & Out Dates</label>
                  <button
                    onClick={handleOpenChkAvlModal}
                    className="btn btn-wc-transparent btn-checkavail"
                  >
                    <DateRangeOutlinedIcon />
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
                      <TodayOutlinedIcon />{" "}
                      <Typography component="span">{checkInDate}</Typography>
                    </div>
                    <div>
                      <InsertInvitationOutlinedIcon />{" "}
                      <Typography component="span">{checkOutDate}</Typography>
                    </div>
                  </div>
                  {dateModalOpen && (
                    <StyledDateRangePicker
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
                        <PermIdentityIcon />{" "}
                        <Typography component="span">
                          {guests || 1} {guests > 1 ? "Guests" : "Guest"},{" "}
                          {roomsInSearch.length}{" "}
                          {roomsInSearch.length > 1 ? "Rooms" : "Room"}
                        </Typography>
                      </div>
                    </div>
                    {roomsModalOpen && (
                      <AddRoomCard handleCloseModal={handleCloseModal} />
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className="search_btn_wrap">
                  <button onClick={handleSearch} className="btn btn-wc-primary">
                    Search <SearchIcon />
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
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
