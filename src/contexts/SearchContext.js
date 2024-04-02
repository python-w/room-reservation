import { createContext, useContext, useReducer } from "react";
import { addDays } from "date-fns";

const roomsToSearch = [
    { id: 'b03e3d90-9d96-11ec-8c9b-5b266c1e6223', 'adults': 4, 'children': 2 },
    { id: 'e7d5f294-9d96-11ec-9a02-5b266c1e6223', 'adults': 6, 'children': 2 },
    { id: '0c2c7f98-9d97-11ec-b999-5b266c1e6223', 'adults': 8, 'children': 4 },
]

const roomsfilterItems = [
    {
        title: "Room Types",
        options: ["Standard Room", "Deluxe Room", "Executive Room", "Superior Room", "Connecting Rooms"],
    },
    {
        title: "Bed Type",
        options: ["Single / Twin", "Double", "King", "Queen", "Bunk Bed"],
    },
    {
        title: "Room Amenities",
        options: ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "Air Conditioning", "TV", "Balcony", "Heating", "Bathtub", "Smoking"],
    },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialState = {
    isSearchActive: false,
    selectedRange: [
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ],
    startDate: null || today,
    endDate: null || tomorrow,
    prevStartDate: null || today,
    prevEndDate: null || tomorrow,
    roomsToSearch: roomsToSearch,
    searchedRooms: [{ id: roomsToSearch[0].id, adults: 1, children: 0 }],
    roomsInSearch: [roomsToSearch[0]],
    roomListing: [],
    isFilterShow: false,
    availableRooms: [],
    filterToggle: false,
    roomsfilterItems,
    selectedFilters: [],
    adultsCount: {},
    childrenCount: {},
    guests: 1,
    isLoading: false,
    bookedRooms: [],
    isDetailView: false,
    bookingCount: 0
}


function reducer(state, action) {
    switch (action.type) {
        case 'DATE_RANGE':
            const item = action.payload;
            const start = item.selection.startDate;
            const end = item.selection.endDate;
            return {
                ...state,
                startDate: start,
                endDate: end,
                selectedRange: [item.selection],
            }
        case 'ADD_ADULT':
        case 'ADD_CHILDREN':
            const roomIdToAdd = action.payload;
            const roomToAdd = state.roomsInSearch.find(room => room.id === roomIdToAdd);

            if (roomToAdd) {
                const countKey = action.type === 'ADD_ADULT' ? 'adultsCount' : 'childrenCount';
                const currentCount = state[countKey][roomIdToAdd] || (action.type === 'ADD_ADULT' ? 1 : 0);

                if (currentCount < (action.type === 'ADD_ADULT' ? roomToAdd.adults : roomToAdd.children)) {
                    const updatedCount = {
                        ...state[countKey],
                        [roomIdToAdd]: currentCount + 1
                    };

                    const updatedRooms = state.searchedRooms.map(room => {
                        if (room.id === roomIdToAdd) {
                            return {
                                ...room,
                                [action.type === 'ADD_ADULT' ? 'adults' : 'children']: updatedCount[roomIdToAdd],
                            };
                        }
                        return room;
                    });

                    return {
                        ...state,
                        [countKey]: updatedCount,
                        guests: state.guests + 1,
                        searchedRooms: updatedRooms,
                        isSearchActive: false,
                    };
                }
            }
            return state;

        case 'MINUS_ADULT':
        case 'MINUS_CHILDREN':
            const roomIdToMinus = action.payload;
            const countKeyToMinus = action.type === 'MINUS_ADULT' ? 'adultsCount' : 'childrenCount';

            if (state[countKeyToMinus][roomIdToMinus] > 0) {
                const updatedCount = {
                    ...state[countKeyToMinus],
                    [roomIdToMinus]: state[countKeyToMinus][roomIdToMinus] - 1
                };

                const updatedRooms = state.searchedRooms.map(room => {
                    if (room.id === roomIdToMinus) {
                        return {
                            ...room,
                            [action.type === 'MINUS_ADULT' ? 'adults' : 'children']: updatedCount[roomIdToMinus],
                        };
                    }
                    return room;
                });

                return {
                    ...state,
                    [countKeyToMinus]: updatedCount,
                    guests: state.guests - 1,
                    searchedRooms: updatedRooms,
                    isSearchActive: false,
                };
            }
            return state;
        case 'ADD_ROOM':
            if (state.roomsInSearch.length < roomsToSearch.length) {
                const roomListing = roomsToSearch.filter(room => !state.roomsInSearch.some(r => r.id === room.id));
                if (roomListing.length > 0) {
                    const nextRoom = roomListing[0];
                    const newRooms = [...state.roomsInSearch, nextRoom];
                    const searchedRooms = [...state.searchedRooms, { ...nextRoom, adults: 1, children: 0 }]
                    return {
                        ...state,
                        roomsInSearch: newRooms,
                        guests: state.guests + 1,
                        searchedRooms,
                        isSearchActive: false,
                    }
                }
            }
            return state;
        case 'REMOVE_ROOM':
            const { roomToRemove } = action.payload;
            const newRooms = state.roomsInSearch.filter(room => room.id !== roomToRemove.id);
            const removedAdults = state.adultsCount[roomToRemove.id] || 1;
            const removedChildren = state.childrenCount[roomToRemove.id] || 0;
            const newsearchedRooms = state.searchedRooms.filter(room => room.id !== roomToRemove.id);
            return {
                ...state,
                roomsInSearch: newRooms,
                searchedRooms: newsearchedRooms,
                adultsCount: {
                    ...state.adultsCount,
                    [roomToRemove.id]: undefined
                },
                childrenCount: {
                    ...state.childrenCount,
                    [roomToRemove.id]: undefined
                },
                guests: state.guests - removedAdults - removedChildren,
                isSearchActive: false,
            };
        case 'SEARCH_LOADING':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'SEARCH_ROOMS':
            const searchrooms = action.payload;
            const minOccupancy = Math.min(...state.searchedRooms.map(room => room.adults + room.children));
            const roomListing = searchrooms.filter(room => {
                const overlappingReservations = room.reservations.some(reservation => {
                    const resStartDate = new Date(reservation.startDate);
                    const resEndDate = new Date(reservation.endDate);
                    const searchStartDate = new Date(state.startDate);
                    const searchEndDate = new Date(state.endDate);
                    return (searchStartDate < resEndDate && searchEndDate > resStartDate);
                });

                return !overlappingReservations && room.available && room.maxOccupancy >= minOccupancy;
            });
            return {
                ...state,
                isLoading: false,
                isFilterShow: true,
                roomListing,
                availableRooms: roomListing,
                prevStartDate: state.startDate,
                prevEndDate: state.endDate,
                isSearchActive: true,
                isSearchFixed: true,
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
        case "FILTER_UPDATE":
            const filterValue = action.payload;
            const updatedFilters = state.selectedFilters.includes(filterValue) ? state.selectedFilters.filter((filter) => filter !== filterValue) : [...state.selectedFilters, filterValue];

            let availableRooms = filterRooms(state.roomListing, updatedFilters);
            if (availableRooms.length === 0) {
                availableRooms = [];
            }
            return {
                ...state,
                selectedFilters: updatedFilters,
                availableRooms: availableRooms,
            };
        case 'UPDATE_BOOKED_ROOMS':
            return { ...state, bookedRooms: action.payload };
        case 'UPDATE_BOOKED_ROOM_COUNT':
            const { roomId, count } = action.payload;
            const updatedRooms = state.availableRooms.map(room =>
                room.id === roomId ? { ...room, bookedRoomCount: count, isSelected: count > 0 } : room
            );
            return { ...state, availableRooms: updatedRooms };
        case 'BOOK_ROOM_ADD':
            return { ...state, bookingCount: state.bookingCount + 1 };
        case 'BOOK_ROOM_SUB':
            return { ...state, bookingCount: state.bookingCount - 1 };
        case 'SELECT_RATE':
            const { rateRoomId, value } = action.payload;
            const updatedBookedRooms = state.bookedRooms.map(room => {
                if (room.bookingId === rateRoomId) {
                    return {
                        ...room,
                        selectedRate: value
                    };
                }
                return room;
            });
            return {
                ...state,
                bookedRooms: updatedBookedRooms,
            };
        case 'ADD_GUEST':
            const { guestRoomId, formData } = action.payload;
            return {
                ...state,
                bookedRooms: state.bookedRooms.map(room => {
                    if (room.id === guestRoomId) {
                        const updatedGuests = Array.isArray(room.guests) ? room.guests : [];
                        console.log(room)
                        return {
                            ...room,
                            guests: [...updatedGuests, formData]
                        };
                    } else {
                        return room;
                    }
                })
            }
        case 'SEARCH_AGAIN':
            return initialState;
        default:
            return state;
    }
}

const filterRooms = (roomListing, selectedFilters) => {
    if (selectedFilters.length === 0) {
        return roomListing;
    }
    return roomListing.filter((room) => {
        if (selectedFilters.includes(room.roomtype) || selectedFilters.includes(room.bedtype) || selectedFilters.every((amenity) => room.amenities.includes(amenity))) {
            return true;
        }
        return false;
    });
};

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>;
};
