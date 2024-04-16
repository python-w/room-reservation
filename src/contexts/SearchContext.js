import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialState = {
  selectedRange: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ],
  startDate: null || today,
  endDate: null || tomorrow,
  searchedRooms: [],
  roomsInSearch: [],
  isFilterShow: false,
  availableRooms: [],
  filterToggle: false,
  isFilterNoMatch: false,
  selectedFilters: [],
  adultsCount: {},
  childrenCount: {},
  guests: 0,
  isLoading: false,
  isLoadingMore: false,
  bookedRooms: [],
  isDetailView: false,
  bookingCount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATE_RANGE":
      const item = action.payload;
      const start = item.selection.startDate;
      const end = item.selection.endDate;
      return {
        ...state,
        startDate: start,
        endDate: end,
        selectedRange: [item.selection],
      };
    case "ADD_ROOM":
      const nextRoom = action.payload;
      const newRoom = [...state.roomsInSearch, nextRoom];
      return {
        ...state,
        roomsInSearch: newRoom,
        guests: state.guests + 1,
      };
    case "REMOVE_ROOM":
      const { roomToRemove } = action.payload;
      const newRooms = state.roomsInSearch.filter(
        (room) => room.id !== roomToRemove.id
      );
      const removedAdults = state.adultsCount[roomToRemove.id] || 1;
      const removedChildren = state.childrenCount[roomToRemove.id] || 0;
      const newsearchedRooms = state.searchedRooms.filter(
        (room) => room.id !== roomToRemove.id
      );
      return {
        ...state,
        roomsInSearch: newRooms,
        searchedRooms: newsearchedRooms,
        adultsCount: {
          ...state.adultsCount,
          [roomToRemove.id]: undefined,
        },
        childrenCount: {
          ...state.childrenCount,
          [roomToRemove.id]: undefined,
        },
        guests: state.guests - removedAdults - removedChildren,
      };
    case "ADD_ADULT":
    case "ADD_CHILDREN":
      const roomIdToAdd = action.payload;
      const roomToAdd = state.roomsInSearch.find(
        (room) => room.id === roomIdToAdd
      );

      if (roomToAdd) {
        const countKey =
          action.type === "ADD_ADULT" ? "adultsCount" : "childrenCount";
        const currentCount =
          state[countKey][roomIdToAdd] || (action.type === "ADD_ADULT" ? 1 : 0);

        if (
          currentCount <
          (action.type === "ADD_ADULT" ? roomToAdd.adults : roomToAdd.children)
        ) {
          const updatedCount = {
            ...state[countKey],
            [roomIdToAdd]: currentCount + 1,
          };

          const updatedRooms = state.searchedRooms.map((room) => {
            if (room.id === roomIdToAdd) {
              return {
                ...room,
                [action.type === "ADD_ADULT" ? "adults" : "children"]:
                  updatedCount[roomIdToAdd],
              };
            }
            return room;
          });

          return {
            ...state,
            [countKey]: updatedCount,
            guests: state.guests + 1,
            searchedRooms: updatedRooms,
          };
        }
      }
      return state;

    case "MINUS_ADULT":
    case "MINUS_CHILDREN":
      const roomIdToMinus = action.payload;
      const countKeyToMinus =
        action.type === "MINUS_ADULT" ? "adultsCount" : "childrenCount";

      if (state[countKeyToMinus][roomIdToMinus] > 0) {
        const updatedCount = {
          ...state[countKeyToMinus],
          [roomIdToMinus]: state[countKeyToMinus][roomIdToMinus] - 1,
        };

        const updatedRooms = state.searchedRooms.map((room) => {
          if (room.id === roomIdToMinus) {
            return {
              ...room,
              [action.type === "MINUS_ADULT" ? "adults" : "children"]:
                updatedCount[roomIdToMinus],
            };
          }
          return room;
        });

        return {
          ...state,
          [countKeyToMinus]: updatedCount,
          guests: state.guests - 1,
          searchedRooms: updatedRooms,
        };
      }
      return state;

    case "SEARCH_LOADING":
      return {
        ...state,
        isLoading: true,
        isFilterShow: true,
        error: null,
      };
    case "SEARCH_ROOMS":
      const searchrooms = action.payload;
      return {
        ...state,
        isLoading: false,
        availableRooms: searchrooms,
      };
    case "LOADING_ROOMS":
      return {
        ...state,
        isLoadingMore: true,
        error: null,
      };
    case "LOADMORE_ROOMS":
      const morerooms = action.payload;
      return {
        ...state,
        isLoadingMore: false,
        availableRooms: [...state.availableRooms, ...morerooms],
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "INFINITE_SCROLL":
      console.log(state.availableRooms);
      return {
        ...state,
      };
    case "FILTER_TOGGLE":
      return {
        ...state,
        filterToggle: !state.filterToggle,
      };
    case "UPDATE_BOOKED_ROOMS":
      return { ...state, bookedRooms: action.payload };
    case "UPDATE_BOOKED_ROOM_COUNT":
      const { roomId, count } = action.payload;
      const updatedRooms = state.availableRooms.map((room) =>
        room.roomId === roomId
          ? { ...room, bookedRoomCount: count, isSelected: count > 0 }
          : room
      );
      return { ...state, availableRooms: updatedRooms };
    case "BOOK_ROOM_ADD":
      return { ...state, bookingCount: state.bookingCount + 1 };
    case "BOOK_ROOM_SUB":
      return { ...state, bookingCount: state.bookingCount - 1 };
    case "SELECT_RATE":
      const { rateRoomId, value } = action.payload;
      const updatedBookedRooms = state.bookedRooms.map((room) => {
        if (room.bookingId === rateRoomId) {
          return {
            ...room,
            selectedRate: value,
          };
        }
        return room;
      });
      return {
        ...state,
        bookedRooms: updatedBookedRooms,
      };
    case "ADD_GUEST":
      const { guestRoomId, formData } = action.payload;
      return {
        ...state,
        bookedRooms: state.bookedRooms.map((room) => {
          if (room.id === guestRoomId) {
            const updatedGuests = Array.isArray(room.guests) ? room.guests : [];
            return {
              ...room,
              guests: [...updatedGuests, formData],
            };
          } else {
            return room;
          }
        }),
      };
    case "SEARCH_AGAIN":
      return initialState;
    default:
      return state;
  }
}

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
