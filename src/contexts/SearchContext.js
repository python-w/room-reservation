import { createContext, useContext, useReducer } from "react";
import { addDays } from 'date-fns';

const roomsToSearch = [
    { id: '1', 'adults': 4, 'children': 2 },
    { id: '2', 'adults': 6, 'children': 2 },
    { id: '3', 'adults': 8, 'children': 4 },
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
    dateModalOpen: false,
    roomsModalOpen: false,
    roomsToSearch: roomsToSearch,
    searchedRooms: [{ id: roomsToSearch[0].id, adults: 1, children: 0 }],
    roomsInSearch: [roomsToSearch[0]],
    roomListing: [],
    isFilterShow: false,
    availableRooms: [],
    filterToggle: false,
    roomsfilterItems,
    selectedFilters: [],
    adultsCount: 1,
    childrenCount: 0,
    guests: 1,
    isLoading: false,
    bookedRooms: [],
    isDetailView: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'DATE_MODAL':
            return {
                ...state,
                dateModalOpen: ((modal) => !modal),
                roomsModalOpen: false,
            }
        case 'ROOMS_MODAL':
            return {
                ...state,
                roomsModalOpen: ((modal) => !modal),
                dateModalOpen: false,
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                dateModalOpen: false,
                roomsModalOpen: false,
            }
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
            const roomIdAddAdult = action.payload;
            const roomToAddAdult = state.roomsInSearch.find(r => r.id === roomIdAddAdult);

            if (roomToAddAdult) {
                const totalAdultsInRoom = state.adultsCount[roomIdAddAdult] || 1;

                if (totalAdultsInRoom < roomToAddAdult.adults) {
                    const updatedAdultsCount = {
                        ...state.adultsCount,
                        [roomIdAddAdult]: totalAdultsInRoom + 1,
                    };

                    const searchedRooms = state.searchedRooms.map(room => {
                        if (room.id === roomIdAddAdult) {
                            return {
                                ...room,
                                adults: updatedAdultsCount[roomIdAddAdult],
                            };
                        }
                        return room;
                    });

                    return {
                        ...state,
                        adultsCount: updatedAdultsCount,
                        guests: state.guests + 1,
                        searchedRooms: searchedRooms,
                        isSearchActive: false,
                    };
                }
            }
            return state;
        case 'MINUS_ADULT':
            const roomIdMinusAdult = action.payload;
            if (state.adultsCount[roomIdMinusAdult] > 1) {

                const updatedAdultsCount = {
                    ...state.adultsCount,
                    [roomIdMinusAdult]: state.adultsCount[roomIdMinusAdult] - 1
                };

                const searchedRooms = state.searchedRooms.map(room => {
                    if (room.id === roomIdMinusAdult) {
                        return {
                            ...room,
                            adults: updatedAdultsCount[roomIdMinusAdult],
                        };
                    }
                    return room;
                });
                return {
                    ...state,
                    adultsCount: updatedAdultsCount,
                    guests: state.guests - 1,
                    searchedRooms,
                    isSearchActive: false,
                }
            }
            return state;
        case 'ADD_CHILDREN':
            const roomIdAddChildren = action.payload;
            const roomToAddChildren = state.roomsInSearch.find(r => r.id === roomIdAddChildren);
            if (roomToAddChildren) {
                if (state.childrenCount[roomIdAddChildren] === undefined || state.childrenCount[roomIdAddChildren] < roomToAddChildren.children) {
                    const updatedChildrenCount = {
                        ...state.childrenCount,
                        [roomIdAddChildren]: (state.childrenCount[roomIdAddChildren] || 0) + 1
                    };
                    const searchedRooms = state.searchedRooms.map(room => {
                        if (room.id === roomIdAddChildren) {
                            return {
                                ...room,
                                children: updatedChildrenCount[roomIdAddChildren],
                            };
                        }
                        return room;
                    });

                    return {
                        ...state,
                        childrenCount: updatedChildrenCount,
                        guests: state.guests + 1,
                        searchedRooms,
                        isSearchActive: false,
                    }
                }
            }
            return state;
        case 'MINUS_CHILDREN':
            const roomIdMinusChildren = action.payload;
            if (state.childrenCount[roomIdMinusChildren] > 0) {
                const updatedChildrenCount = {
                    ...state.childrenCount,
                    [roomIdMinusChildren]: state.childrenCount[roomIdMinusChildren] - 1
                };
                const searchedRooms = state.searchedRooms.map(room => {
                    if (room.id === roomIdMinusChildren) {
                        return {
                            ...room,
                            children: updatedChildrenCount[roomIdMinusChildren],
                        };
                    }
                    return room;
                });
                return {
                    ...state,
                    childrenCount: updatedChildrenCount,
                    guests: state.guests - 1,
                    searchedRooms,
                    isSearchActive: false,
                }
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
            };
        case 'SEARCH_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case 'FILTER_TOGGLE':
            return {
                ...state,
                filterToggle: !state.filterToggle,
            }
        case 'FILTER_UPDATE':
            const filterValue = action.payload;
            const updatedFilters = state.selectedFilters.includes(filterValue)
                ? state.selectedFilters.filter((filter) => filter !== filterValue)
                : [...state.selectedFilters, filterValue];

            let availableRooms = filterRooms(state.roomListing, updatedFilters);
            if (availableRooms.length === 0) {
                availableRooms = [];
            }
            console.log(availableRooms, state.roomListing, updatedFilters)
            return {
                ...state,
                selectedFilters: updatedFilters,
                availableRooms: availableRooms,
            };
        case 'SELECT_ROOM':
            return {
                ...state,
                bookedRooms: [...state.bookedRooms, action.payload],
                availableRooms: state.availableRooms.map(room => {
                    if (room.id === action.payload.id) {
                        return {
                            ...room,
                            isSelected: true,
                            bookedRoomCount: 1
                        };
                    } else {
                        return room;
                    }
                }),
            };
        case 'SELECTROOM_ADD':
            const roomToAddId = action.payload;
            if (state.bookedRooms.length < state.searchedRooms.length) {
                const updatedBookedRooms = [...state.bookedRooms, roomToAddId];
                return {
                    ...state,
                    bookedRooms: updatedBookedRooms,
                    availableRooms: state.availableRooms.map(room => {
                        if (room.id === roomToAddId) {
                            return {
                                ...room,
                                bookedRoomCount: room.bookedRoomCount + 1
                            };
                        } else {
                            return room;
                        }
                    })
                };
            } else {
                return state;
            }
        case 'SELECTROOM_SUB':
            const roomToSubId = action.payload;
            return {
                ...state,
                bookedRooms: state.bookedRooms.filter(id => id !== roomToSubId),
                availableRooms: state.availableRooms.map(room => {
                    if (room.id === roomToSubId) {
                        const updatedRoom = {
                            ...room,
                            bookedRoomCount: room.bookedRoomCount - 1
                        };
                        if (updatedRoom.bookedRoomCount === 0) {
                            const { bookedRoomCount, ...updatedRoomWithoutCount } = updatedRoom;
                            return { ...updatedRoomWithoutCount, isSelected: false };
                        } else {
                            return updatedRoom;
                        }
                    } else {
                        return room;
                    }
                })
            };
        case 'SELECT_RATE':
            const { roomId, selectedRate: { rate } } = action.payload;
            const updatedBookedRooms = state.bookedRooms.map(room => {
                if (room.id === roomId) {
                    return {
                        ...room,
                        selectedRate: rate
                    };
                }
                return room;
            });
            return {
                ...state,
                bookedRooms: updatedBookedRooms,
            };
        default:
            return state;
    }
}

const filterRooms = (roomListing, selectedFilters) => {
    if (selectedFilters.length === 0) {
        return roomListing;
    }
    return roomListing.filter((room) => {
        if (
            selectedFilters.includes(room.roomtype) ||
            selectedFilters.includes(room.bedtype) ||
            selectedFilters.every((amenity) => room.amenities.includes(amenity))
        ) {
            return true;
        }
        return false;
    });
};

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SearchContext.Provider value={{ state, dispatch }} >
            {children}
        </SearchContext.Provider>
    )
}
