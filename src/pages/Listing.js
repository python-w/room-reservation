import Filters from "../features/filter/filter";
import FilterButton from "../ui/FilterButton";
import RoomListView from "../ui/RoomListView";
import useWindowWidth from "../hooks/useWindowWidth";
import { useSearch } from "../contexts/SearchContext";
import Spinner from "../ui/Spinner";

export default function RoomListing() {

  const { state } = useSearch();

  const isLargeScreen = useWindowWidth();
  const { availableRooms, filterToggle, isFilterShow, isLoading, error } = state;

  if (isLoading) return <Spinner />;


  if (error) return <div class="alert alert-danger" role="alert">Something went wrong. Please try again later.</div>

  return (
    <>
      <div className="room_listing">
        <div className="row">
          {isLargeScreen && isFilterShow ?
            <div className='col-lg-3 pr-lg-4'>
              <Filters />
            </div>
            :
            <>
              <FilterButton />
              {filterToggle &&
                <div className='col-lg-3 pr-lg-4'>
                  <Filters />
                </div>
              }
            </>
          }
          {
            availableRooms.length > 0 &&
            <div className="col-lg-9 pl-lg-3">
              {availableRooms.map((room, index) => (
                <RoomListView room={room} index={index} key={room.id} />
              ))}
              <div className="d-flex justify-content-end rl_btn_wrap">
                <button className="btn btn-primary">
                  Proceed
                </button>
              </div>
            </div>
          }
          {
            availableRooms.length === 0 && isFilterShow &&
            <div className="col-lg-9 pl-lg-3">
              <div class="alert alert-info" role="alert">No rooms match the selected filters.</div>
            </div>
          }
        </div>
      </div >
    </>
  );
}
