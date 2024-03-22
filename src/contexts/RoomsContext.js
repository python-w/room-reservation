import { createContext, useContext, useReducer } from "react";

const rooms = [
    {
        id: 1,
        title: "Royal Suite, Executive lounge access, Suite, 1 King",
        roomtype: "Standard Room",
        bedtype: "Single / Twin",
        amenities: ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "TV", "Air Conditioning", "Balcony", "Smoking"],
        price: "$100.50",
        address: "1600 Northstar dr. Atlanta, GA 30012",
        description: "Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui",
        maxOccupancy: {
            adults: 2,
            children: 1,
        },
        available: true,
        reservations: [],
        images: {
            thumbs: ['https://lipsum.app/id/60/400x300', 'https://lipsum.app/id/61/400x300', 'https://lipsum.app/id/63/400x300'],
            large: ['https://lipsum.app/id/60/1920x1080', 'https://lipsum.app/id/61/1920x1080', 'https://lipsum.app/id/63/1920x1080'],
        }
    },
    {
        id: 2,
        title: "Royal Suite, Executive lounge access, Suite, 1 King",
        roomtype: "Deluxe Room",
        bedtype: "Double",
        amenities: ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking"],
        price: "$200.50",
        address: "1400 Northstar dr. Atlanta, FL 30012",
        description: "Welcome to our cozy Standard Room, ideal for solo travelers or couples.",
        maxOccupancy: {
            adults: 2,
            children: 1,
        },
        available: false,
        reservations: [
            { startDate: "2024-03-25", endDate: "2024-03-28" },
        ],
        images: {
            thumbs: ['https://lipsum.app/id/64/400x300', 'https://lipsum.app/id/65/400x300', 'https://lipsum.app/id/66/400x300'],
            large: ['https://lipsum.app/id/64/1920x1080', 'https://lipsum.app/id/65/1920x1080', 'https://lipsum.app/id/66/1920x1080'],
        }

    },
    {
        id: 3,
        title: "Royal Suite, Executive lounge access, Suite, 1 King",
        roomtype: "Executive Room",
        bedtype: "King",
        amenities: ["Wifi", "Free Parking", "TV", "Air Conditioning", "Balcony", "Heating", "Bathtub", "Smoking"],

        price: "$300.50",
        address: "1600 Northstar dr. Atlanta, CA 30012",
        description: "Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui",
        maxOccupancy: {
            adults: 2,
            children: 1,
        },
        available: false,
        reservations: [
            { startDate: "2024-03-25", endDate: "2024-03-28" },
        ],
        images: {
            thumbs: ['https://lipsum.app/id/67/400x300', 'https://lipsum.app/id/68/400x300', 'https://lipsum.app/id/69/400x300'],
            large: ['https://lipsum.app/id/67/1920x1080', 'https://lipsum.app/id/68/1920x1080', 'https://lipsum.app/id/69/1920x1080'],
        }
    },
    {
        id: 4,
        title: "Royal Suite, Executive lounge access, Suite, 1 King",
        roomtype: "Superior Room",
        bedtype: "Queen",
        amenities: ["2 Double Beds", "Dinner", "Swimming Pool", "Wifi", "Free Parking", "TV", "Air Conditioning", "Balcony", "Heating", "Bathtub", "Smoking"],
        price: "$400.50",
        address: "1700 Northstar dr. Atlanta, GA 30012",
        description: "Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV.",
        maxOccupancy: {
            adults: 2,
            children: 1,
        },
        available: true,
        reservations: [
            { startDate: "2024-03-25", endDate: "2024-03-28" },
        ],
        images: {
            thumbs: ['https://lipsum.app/id/70/400x300', 'https://lipsum.app/id/71/400x300', 'https://lipsum.app/id/72/400x300'],
            large: ['https://lipsum.app/id/70/1920x1080', 'https://lipsum.app/id/71/1920x1080', 'https://lipsum.app/id/72/1920x1080'],
        }
    },
    {
        id: 5,
        title: "Royal Suite, Executive lounge access, Suite, 1 King",
        roomtype: "Executive Room",
        bedtype: "Bunk Bed",
        amenities: ["2 Double Beds", "Dinner", "Swimming Pool", "Balcony", "Heating", "Bathtub", "Smoking"],
        price: "$500.50",
        address: "1600 Northstar dr. Atlanta, IL 30012",
        description: "Welcome to our cozy Standard Room, ideal for solo travelers or couples. Enjoy modern amenities, including free Wi-Fi and a flat-screen TV. Relax in the queen-sized bed and refresh in the en-sui",
        maxOccupancy: {
            adults: 2,
            children: 1,
        },
        available: true,
        reservations: [
            { startDate: "2024-03-25", endDate: "2024-03-28" },
        ],
        images: {
            thumbs: ['https://lipsum.app/id/73/400x300', 'https://lipsum.app/id/74/400x300', 'https://lipsum.app/id/75/400x300'],
            large: ['https://lipsum.app/id/73/1920x1080', 'https://lipsum.app/id/74/1920x1080', 'https://lipsum.app/id/75/1920x1080'],
        }

    },
];

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

const initialState = {
    rooms,
    roomsfilterItems,
    amenitiesWidth: 0,
    isFilterShow: false,
    selectedFilters: [],
    filteredRooms: rooms
}

function reducer(state, action) {
    switch (action.type) {
        case 'FILTER_TOGGLE':
            return {
                ...state,
                isFilterShow: !state.isFilterShow,
            }
        case 'FILTER_UPDATE':
            const filterValue = action.payload;
            const updatedFilters = state.selectedFilters.includes(filterValue)
                ? state.selectedFilters.filter((filter) => filter !== filterValue)
                : [...state.selectedFilters, filterValue];

            const filteredRooms = filterRooms(state.rooms, updatedFilters);

            return {
                ...state,
                selectedFilters: updatedFilters,
                filteredRooms: filteredRooms,
            };
        default:
            return state;
    }
}

const filterRooms = (rooms, selectedFilters) => {
    if (selectedFilters.length === 0) {
        return rooms;
    }
    return rooms.filter((room) => {
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

const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext)

export const RoomsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RoomsContext.Provider value={{ state, dispatch }}>
            {children}
        </RoomsContext.Provider>
    );
}

