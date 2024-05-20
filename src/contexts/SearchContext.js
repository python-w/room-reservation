import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { differenceInDays } from "date-fns"

const initialState = {
  searchedRooms: [],
  roomsInSearch: [],
  availableRooms: [],
  selectedRooms: [],
  isFilterShow: false,
  filterToggle: false,
  isFilterNoMatch: false,
  selectedFilters: [],
  totalGuests: 1,
  isLoading: false,
  isLoadingMore: false,
  bookingCount: 0,
  selectedRoomIndex: 0,
  checkAgeGroupEnabled: false,
  isDateInitialized: false
};

function reducer(state, action) {
  switch (action.type) {
    case "DATE_INITIALIZED":
      return {
        ...state,
        isDateInitialized: true,
      }
    case "DATE_RANGE":
      const item = action.payload;
      const start = item.startDate;
      const end = item.endDate;
      const numberOfNights = differenceInDays(end, start);
      return {
        ...state,
        startDate: start,
        endDate: end,
        numberOfNights,
        selectedRange: item,
      };
    case "CHECK_AGEGROUP_ENABLED":
      return {
        ...state,
        checkAgeGroupEnabled: action.payload
      }
    case "AGE_GROUP_LIST":
      return {
        ...state,
        allAgeGroupsList: action.payload
      }
    case "ROOM_INITIALIZED":
      const initRoom = action.payload;
      const initRoomsInSearch = [...state.roomsInSearch, { id: uuidv4(), ...initRoom }];
      const roomInitData = initRoomsInSearch.map((room) => {
        if (room.ageGroups) {
          const roomData = {};
          room.ageGroups.forEach((ageGroup) => {
            roomData[ageGroup.ageGroupId] = ageGroup.count;
          });
          return roomData;
        } else {
          return room;
        }
      });
      return {
        ...state,
        roomsInSearch: initRoomsInSearch,
        searchedRooms: roomInitData,
      };
    case "UPDATE_ROOM_IN_SEARCH":
      const roomspayload = action.payload;
      const updatedRoomsInSearch = [...state.roomsInSearch, { id: uuidv4(), ...roomspayload }];
      const roomSearchData = updatedRoomsInSearch.map((room) => {
        if (room.ageGroups) {
          const roomData = {};
          room.ageGroups.forEach((ageGroup) => {
            roomData[ageGroup.ageGroupId] = ageGroup.count;
          });
          return roomData;
        }
      });
      return {
        ...state,
        roomsInSearch: updatedRoomsInSearch,
        searchedRooms: roomSearchData,
      };
    case "REMOVE_ROOM_IN_SEARCH":
      const removedRoomId = action.payload;
      const removeRooms = state.roomsInSearch.filter((room) => room.id !== removedRoomId);
      return {
        ...state,
        roomsInSearch: removeRooms
      };
    case "UPDATE_SEARCHED_ROOM":
      const searchRoomsArray = action.payload;
      return {
        ...state,
        searchedRooms: searchRoomsArray,
      };
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
        selectedRooms: [],
        bookingCount: 0,
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
    case "FILTER_TOGGLE":
      return {
        ...state,
        filterToggle: !state.filterToggle,
      };
    case "UPDATE_SELECTED_ROOMS":
      const removeActiveRoom = state.availableRooms.map((room) => ({ ...room, isRoomViewed: false }));
      return { ...state, availableRooms: removeActiveRoom, selectedRooms: action.payload };
    case "UPDATE_SELECTED_ROOM_COUNT":
      const { roomId, count } = action.payload;
      const updatedRooms = state.availableRooms.map((room) =>
        room.roomId === roomId
          ? { ...room, bookedRoomCount: count, isSelected: count > 0 }
          : room
      );
      return { ...state, availableRooms: updatedRooms };
    case "BOOK_ROOM_ADD":
      return { ...state, bookingCount: state.bookingCount + 1, selectedRoomIndex: state.selectedRoomIndex + 1 };
    case "BOOK_ROOM_SUB":
      return { ...state, bookingCount: state.bookingCount - 1, selectedRoomIndex: state.selectedRoomIndex - 1 };
    case "VIEWED_ROOM":
      const viewedRoomId = action.payload;
      const updateViewedRoom = state.availableRooms.map((room) =>
        room.roomId === viewedRoomId
          ? { ...room, isRoomViewed: true, }
          : { ...room, isRoomViewed: false }
      );
      return { ...state, availableRooms: updateViewedRoom };
    case "RESERVED_FOR": {
      const { bookingId, value } = action.payload;
      const updatedselectedRooms = state.selectedRooms.map((room) => {
        if (room.bookingId === bookingId) {
          return {
            ...room,
            reservedFor: value,
          };
        }
        return room;
      });
      return {
        ...state,
        selectedRooms: updatedselectedRooms,
      };
    }
    case "SELECT_RATE":
      const { rateRoomId, value } = action.payload;
      const updatedselectedRooms = state.selectedRooms.map((room) => {
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
        selectedRooms: updatedselectedRooms,
      };
    case "ADD_GUEST":
      const { guestBookingId, formData } = action.payload;
      return {
        ...state,
        selectedRooms: state.selectedRooms.map((room) => {
          if (room.bookingId === guestBookingId) {
            const updatedGuest = Array.isArray(room.guest) ? room.guest : [];
            return {
              ...room,
              guest: [...updatedGuest, formData],
              reservedFor: "Guest"
            };
          } else {
            return room;
          }
        }),
      };
    case "UPDATE_GUESTS":
      const totalGuests = state.roomsInSearch.reduce((total, room) => {
        if (room.ageGroups) {
          const roomTotal = room.ageGroups.reduce((acc, ageGroup) => acc + ageGroup.count, 0);
          return total + roomTotal;
        } else {
          return total;
        }
      }, 0);
      return {
        ...state,
        totalGuests: totalGuests,
      }
    case "REMOVE_GUEST":
      const removedGuest = action.payload;
      return {
        ...state,
        selectedRooms: removedGuest,
        reservedFor: null
      }
    case "SELECT_AGEGROUP":
      const { bookingId, ageGroup } = action.payload;
      return {
        ...state,
        selectedRooms: state.selectedRooms.map((room) => {
          if (room.bookingId === bookingId) {
            return {
              ...room,
              occupants: ageGroup
            };
          } else {
            return room;
          }
        }),
      }
    case "REMOVE_SELECTED_ROOM":
      const revmoedRoom = action.payload;
      return {
        ...state,
        selectedRooms: revmoedRoom
      }
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
