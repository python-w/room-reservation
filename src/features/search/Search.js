import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import StyledDateRangePicker from "./DateRangePicker";
import AddRoomCard from "./AddRoomCard";
import { useSearch } from "../../contexts/SearchContext";
import { format } from "date-fns";
import CheckAvailability from "../check-availability/CheckAvailability";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { getAllAgeGroup } from "../../services/apiAgeGroup";
import { v4 as uuidv4 } from "uuid";

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

  //Fetch AgeGroup
  const [ageGroup, setAgeGroup] = useState([]);
  const [ageGroupLoading, setAgeGroupLoading] = useState(false);
  const [ageGroupError, setAgeGroupError] = useState(null);
  const [occoccupants, setAcccupants] = useState([])
  useEffect(() => {
    async function getAgeGroup() {
      setAgeGroupLoading(true);
      try {
        const data = await getAllAgeGroup();
        setAgeGroupLoading(false);
        setAgeGroup(data);
        const occupants = data.reduce((acc, curr) => {
          acc[curr.ageGroupName.toLowerCase().replace(" ", "")] =
            curr.maxOccupants;
          return acc;
        }, {});
        setAcccupants(occupants)
        dispatch({ type: "ADD_ROOM", payload: { id: uuidv4(), ...occupants } });
      } catch (err) {
        setAgeGroupError(err.message);
      }
    }
    getAgeGroup();
  }, []);

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

  //Fetch search rooms
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPagesFetched, setAllPagesFetched] = useState(false);

  const fetchData = async () => {
    dispatch({ type: "SEARCH_LOADING" });
    try {
      const response = await axios.get(
        `http://localhost:5000/rooms?websiteView=0&noOfBeds=1&_page=${page}`
      );

      const totalPages = response.data.pages;
      setTotalPages(totalPages);

      dispatch({ type: "SEARCH_ROOMS", payload: response.data.data });

      if (page >= totalPages) {
        setAllPagesFetched(true);
      }
    } catch (error) {
      let errorMessage;

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Something went wrong. Please try again";
        }
      } else if (error.message === "Network Error") {
        errorMessage =
          "You are offline. Please check your internet connection and try again.";
      }
      dispatch({ type: "SEARCH_ERROR", payload: errorMessage });
    }
  };

  useEffect(() => {
    if (allPagesFetched) return;
    const handleScroll = async () => {
      try {
        if (isBottom && page < totalPages && !allPagesFetched && !isLoading) {
          dispatch({ type: "LOADING_ROOMS" });
          const newPage = page + 1;
          setPage(newPage);
          const response = await axios.get(
            `http://localhost:5000/rooms?websiteView=0&noOfBeds=1&_page=${newPage}`
          );
          if (newPage > page) {
            dispatch({ type: "LOADMORE_ROOMS", payload: response.data.data });
          }
        }
      } catch (error) {
        let errorMessage;

        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Something went wrong. Please try again";
          }
        } else if (error.message === "Network Error") {
          errorMessage =
            "You are offline. Please check your internet connection and try again.";
        }
        dispatch({ type: "SEARCH_ERROR", payload: errorMessage });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, isBottom, allPagesFetched, isLoading, totalPages, dispatch]);

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
                        <PersonOutlineOutlinedIcon />{" "}
                        <Typography component="span">
                          {guests || 1} {guests > 1 ? "Guests" : "Guest"},{" "}
                          {roomsInSearch.length || 1}{" "}
                          {roomsInSearch.length > 1 ? "Rooms" : "Room"}
                        </Typography>
                      </div>
                    </div>
                    {roomsModalOpen && (
                      <AddRoomCard
                        occoccupants={occoccupants}
                        ageGroupLoading={ageGroupLoading}
                        ageGroup={ageGroup}
                        ageGroupError={ageGroupError}
                        handleCloseModal={handleCloseModal}
                      />
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className="search_btn_wrap">
                  <button onClick={handleSearch} className="btn btn-wc-primary">
                    Search <EastOutlinedIcon />
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
