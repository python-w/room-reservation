import { createContext, useContext, useReducer } from "react";
import { addDays, format } from 'date-fns';

const initialRooms = [
    { id: '1', 'adults': 4, 'children': 2 },
    { id: '2', 'adults': 6, 'children': 2 },
    { id: '3', 'adults': 8, 'children': 4 },
]

const initialState = {
    todayDate: format(new Date(), 'E, d MMM'),
    selectedRange: [
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ],
    startDate: null,
    endDate: null,
    dateModalOpen: false,
    roomsModalOpen: false,
    initialRooms: initialRooms,
    bookedRooms: [{ id: initialRooms[0].id, adults: 1, children: 0 }],
    rooms: [initialRooms[0]],
    adultsCount: 1,
    childrenCount: 0,
    guests: 1,
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
            const roomToAddAdult = state.rooms.find(r => r.id === roomIdAddAdult);

            if (roomToAddAdult) {
                const totalAdultsInRoom = state.adultsCount[roomIdAddAdult] || 1;

                if (totalAdultsInRoom < roomToAddAdult.adults) {
                    const updatedAdultsCount = {
                        ...state.adultsCount,
                        [roomIdAddAdult]: totalAdultsInRoom + 1,
                    };

                    const bookedRooms = state.bookedRooms.map(room => {
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
                        bookedRooms: bookedRooms,
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

                const bookedRooms = state.bookedRooms.map(room => {
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
                    bookedRooms
                }
            }
            return state;
        case 'ADD_CHILDREN':
            const roomIdAddChildren = action.payload;
            const roomToAddChildren = state.rooms.find(r => r.id === roomIdAddChildren);
            if (roomToAddChildren) {
                if (state.childrenCount[roomIdAddChildren] === undefined || state.childrenCount[roomIdAddChildren] < roomToAddChildren.children) {
                    const updatedChildrenCount = {
                        ...state.childrenCount,
                        [roomIdAddChildren]: (state.childrenCount[roomIdAddChildren] || 0) + 1
                    };
                    const bookedRooms = state.bookedRooms.map(room => {
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
                        bookedRooms,
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
                const bookedRooms = state.bookedRooms.map(room => {
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
                    bookedRooms,
                }
            }
            return state;
        case 'ADD_ROOM':
            if (state.rooms.length < initialRooms.length) {
                const availableRooms = initialRooms.filter(room => !state.rooms.some(r => r.id === room.id));
                if (availableRooms.length > 0) {
                    const nextRoom = availableRooms[0];
                    const newRooms = [...state.rooms, nextRoom];
                    const bookedRooms = [...state.bookedRooms, { ...nextRoom, adults: 1, children: 0 }]
                    return {
                        ...state,
                        rooms: newRooms,
                        guests: state.guests + 1,
                        bookedRooms,
                    }
                }
            }
            return state;
        case 'REMOVE_ROOM':
            const { roomToRemove } = action.payload;
            const newRooms = state.rooms.filter(room => room.id !== roomToRemove.id);
            const removedAdults = state.adultsCount[roomToRemove.id] || 1;
            const removedChildren = state.childrenCount[roomToRemove.id] || 0;
            const newBookedRooms = state.bookedRooms.filter(room => room.id !== roomToRemove.id);
            return {
                ...state,
                rooms: newRooms,
                bookedRooms: newBookedRooms,
                adultsCount: {
                    ...state.adultsCount,
                    [roomToRemove.id]: undefined
                },
                childrenCount: {
                    ...state.childrenCount,
                    [roomToRemove.id]: undefined
                },
                guests: state.guests - removedAdults - removedChildren,
            };
        default:
            return state;
    }
}

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
