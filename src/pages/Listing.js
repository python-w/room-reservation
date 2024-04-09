import Alert from '@mui/material/Alert';
import Filters from "../features/filter/Filters";
import FilterButton from "../ui/FilterButton";
import RoomListView from "../ui/RoomListView";
import useWindowWidth from "../hooks/useWindowWidth";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop ";
import ListingSkeleton from "../ui/ListingSkeleton";
import Search from '../features/search/Search';

export default function RoomListing() {

  const { state } = useSearch();

  const isTop = useScrollToTop();
  const { isLargeScreen } = useWindowWidth();

  const { availableRooms, filterToggle, isFilterShow, isFilterNoMatch, isLoading, error, isSearchActive, bookedRooms } = state;

  if (error) return <Alert severity="error" className='mt-5'>{error.message}</Alert>

  return (
    <>
      <Search />
      <div className='container'>
        <div className={`${isTop && isLargeScreen ? "has_pt" : ""} room_listing`}>
          <div className="row">
            <div className='col-lg-3 pr-lg-4'>
              {isLargeScreen && isFilterShow ?
                <Filters />
                :
                <>
                  <FilterButton />
                  {filterToggle &&
                    <Filters />
                  }
                </>
              }
            </div>
            <div className="col-lg-9 pl-lg-3">
              {
                availableRooms.length === 0 && isSearchActive &&
                <Alert severity="warning">Unfortunately, we don't have any rooms available for the dates you've chosen.</Alert>
              }
              {
                availableRooms.length === 0 && isFilterNoMatch &&
                <Alert severity="warning">No rooms match the selected filters.</Alert>
              }
              {
                isLoading ?
                  <>
                    {Array.from({ length: 4 }, (_, index) => <ListingSkeleton key={index} />)}
                  </>
                  :
                  availableRooms.length > 0 &&
                  <>
                    {availableRooms.map((room, index) => (
                      <RoomListView room={room} index={index} key={index} />
                    ))}
                    {bookedRooms.length > 0 &&
                      <div className="d-flex justify-content-end rl_btn_wrap">
                        <Link to='/reservation-summary' className="btn btn-wc-primary">
                          Proceed
                        </Link>
                      </div>
                    }
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
