import Filters from "../features/filter/filter";
import Search from "../features/search/Search";
import { useRooms } from "../contexts/RoomsContext";
import FilterButton from "../ui/FilterButton";
import RoomListView from "../ui/RoomListView";
import useWindowWidth from "../hooks/useWindowWidth";

export default function RoomListing() {

  const { state } = useRooms();
  const isLargeScreen = useWindowWidth();
  const { isFilterShow, filteredRooms } = state;

  console.log(isLargeScreen, isFilterShow)

  return (
    <div className="room_listing">
      <Search />
      <div className="row">
        {isLargeScreen ?
          <div className='col-lg-3 pr-lg-4'>
            <Filters />
          </div>
          :
          <>
            <FilterButton />
            {isFilterShow &&
              <div className='col-lg-3 pr-lg-4'>
                <Filters />
              </div>
            }
          </>
        }
        <div className="col-lg-9 pl-lg-3">
          {filteredRooms.map((room, index) => (
            <RoomListView room={room} index={index} key={room.id} />
          ))}
          <div className="d-flex justify-content-end rl_btn_wrap">
            <button className="btn btn-primary">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
