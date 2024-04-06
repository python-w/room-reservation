import Alert from '@mui/material/Alert';
import Filters from "../features/filter/filter";
import FilterButton from "../ui/FilterButton";
import RoomListView from "../ui/RoomListView";
import useWindowWidth from "../hooks/useWindowWidth";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop ";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ListingSkeleton from "../ui/ListingSkeleton";

export default function RoomListing() {

  const { state } = useSearch();

  const isTop = useScrollToTop();
  const isBottom = useInfiniteScroll()
  console.log(isBottom)
  const { isLargeScreen } = useWindowWidth();

  const { availableRooms, filterToggle, isFilterShow, isFilterNoMatch, isLoading, error, bookedRooms } = state;

  if (error) return <Alert severity="error" className='mt-5'>{error.message}</Alert>

  return (
    <>
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
                    <RoomListView room={room} index={index} key={room.id} />
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
    </>
  );
}
