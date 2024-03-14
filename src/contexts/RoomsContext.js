import { createContext, useContext, useReducer } from "react";
import { addDays, format } from 'date-fns';

const initialRooms = [
    { id: '1', 'adults': 5, 'children': 2 },
    { id: '2', 'adults': 3, 'children': 0 },
    { id: '3', 'adults': 2, 'children': 4 },
]

const initialState = {
    todayDate: format(new Date(), 'E, MMM d'),
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
    bookedRooms: [{ id: initialRooms[0].id, adults: initialRooms[0].adults, children: initialRooms[0].childrenCount }],
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
            const newStart = format(start, 'E, MMM d');
            const newEnd = format(end, 'E, MMM d');
            return {
                ...state,
                startDate: newStart,
                endDate: newEnd,
                selectedRange: [item.selection],
            }
        case 'ADD_ADULT':
            const roomIdAddAdult = action.payload;
            const roomToAddAdult = state.rooms.find(r => r.id === roomIdAddAdult);
            if (roomToAddAdult) {
                const totalAdultsInRoom = state.adultsCount[roomIdAddAdult] || 1;
                if (totalAdultsInRoom < roomToAddAdult.adults) {
                    return {
                        ...state,
                        adultsCount: {
                            ...state.adultsCount,
                            [roomIdAddAdult]: (state.adultsCount[roomIdAddAdult] || 1) + 1,
                        },
                        guests: state.guests + 1,
                    };
                }
            }
            return state;
        case 'MINUS_ADULT':
            const roomIdMinusAdult = action.payload;
            if (state.adultsCount[roomIdMinusAdult] > 1) {
                return {
                    ...state,
                    adultsCount: {
                        ...state.adultsCount,
                        [roomIdMinusAdult]: state.adultsCount[roomIdMinusAdult] - 1
                    },
                    guests: state.guests - 1,
                }
            }
            return state;
        case 'ADD_CHILDREN':
            const roomIdAddChildren = action.payload;
            const roomToAddChildren = state.rooms.find(r => r.id === roomIdAddChildren);
            if (roomToAddChildren) {
                if (state.childrenCount[roomIdAddChildren] === undefined || state.childrenCount[roomIdAddChildren] < roomToAddChildren.children) {
                    return {
                        ...state,
                        childrenCount: {
                            ...state.childrenCount,
                            [roomIdAddChildren]: (state.childrenCount[roomIdAddChildren] || 0) + 1
                        },
                        guests: state.guests + 1,
                    }
                }
            }
            return state;
        case 'MINUS_CHILDREN':
            const roomIdMinusChildren = action.payload;
            if (state.childrenCount[roomIdMinusChildren] > 0) {
                return {
                    ...state,
                    childrenCount: {
                        ...state.childrenCount,
                        [roomIdMinusChildren]: state.childrenCount[roomIdMinusChildren] - 1
                    },
                    guests: state.guests - 1,
                }
            }
            return state;
        case 'ADD_ROOM':
            if (state.rooms.length < initialRooms.length) {
                const availableRooms = initialRooms.filter(room => !state.rooms.some(r => r.id === room.id));
                if (availableRooms.length > 0) {
                    const nextRoom = availableRooms[0];
                    const newRooms = [...state.rooms, nextRoom];
                    return {
                        ...state,
                        rooms: newRooms,
                        guests: state.guests + 1,
                    }
                }
            }
            return state;
        case 'REMOVE_ROOM':
            const { roomToRemove } = action.payload;
            const newRooms = state.rooms.filter((el) => el.id !== roomToRemove.id);
            const removedAdults = state.adultsCount[roomToRemove.id] || 1;
            const removedChildren = state.childrenCount[roomToRemove.id] || 0;
            const newAdultsCount = { ...state.adultsCount };
            const newChildrenCount = { ...state.childrenCount };
            delete newAdultsCount[roomToRemove.id];
            delete newChildrenCount[roomToRemove.id];
            return {
                ...state,
                rooms: newRooms,
                adultsCount: newAdultsCount,
                childrenCount: newChildrenCount,
                guests: state.guests - removedAdults - removedChildren,
            };
        default:
            return state;
    }
}

const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RoomsContext.Provider value={{ state, dispatch }} >
            {children}
        </RoomsContext.Provider>
    )
}
