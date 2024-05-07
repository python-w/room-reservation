import React from "react";
import Filters from "../features/filter/Filters";
import FilterButton from "../ui/FilterButton";
import RoomListTile from "../ui/RoomListTile";
import useWindowWidth from "../hooks/useWindowWidth";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import ListingSkeleton from "../ui/ListingSkeleton";
import Search from "../features/search/Search";
import { Alert } from "@material-ui/lab";
import IndexPlaceholder from "../ui/IndexPlaceholder"

export function RoomListing() {
  const { state } = useSearch();
  const { isLargeScreen } = useWindowWidth();
  const {
    availableRooms,
    filterToggle,
    isFilterShow,
    isFilterNoMatch,
    isLoading,
    isLoadingMore,
    error,
    isSearchActive,
    selectedRooms,
    searchedRooms
  } = state;



  return (
    <>
      <div className="search_listing">
        <Search />
      </div>
      {error && (
        <Alert severity="error" className="mt-5">
          {error}
        </Alert>
      )}
      {availableRooms.length === 0 && (
        <IndexPlaceholder />
      )}
      <div
        className="room_listing"
      >
        <div className="row">
          <div className="col-lg-3 pr-lg-4">
            {isLargeScreen && isFilterShow && !error ? (
              <Filters />
            ) : (
              <>
                <FilterButton />
                {filterToggle && <Filters />}
              </>
            )}
          </div>
          <div className="col-lg-9 pl-lg-3">
            {availableRooms.length === 0 && isSearchActive && <Alert severity="warning">Unfortunately, we don't have any rooms available for the dates you've chosen.</Alert>}
            {availableRooms.length === 0 && isFilterNoMatch && <Alert severity="warning">No rooms match the selected filters.</Alert>}
            {isLoading ? (
              <>
                {Array.from({ length: 4 }, (_, index) => (
                  <ListingSkeleton key={index} />
                ))}
              </>
            ) : (
              availableRooms.length > 0 && (
                <>
                  {availableRooms.map((room, index) => (
                    <RoomListTile room={room} index={index} key={index} />
                  ))}
                  {selectedRooms.length > 0 && (
                    <div className={`${searchedRooms.length > 1 ? 'justify-content-between' : 'justify-content-end'}  d-flex rl_btn_wrap align-items-center`}>
                      {searchedRooms.length > 1 &&
                        <p className="mb-0">You have selected {selectedRooms.length} of {searchedRooms.length} rooms.</p>
                      }
                      <Link to="/reservation-summary" className="btn btn-wc-primary">
                        Proceed
                      </Link>
                    </div>
                  )}
                </>
              )
            )}
            {error && isLoadingMore && (
              <Alert severity="error" className="my-5">
                {error}
              </Alert>
            )}
            {isLoadingMore && Array.from({ length: 4 }, (_, index) => <ListingSkeleton key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomListing;
