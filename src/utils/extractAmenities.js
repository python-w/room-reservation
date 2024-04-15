export default function extractAmenities(room) {
    let amenities = [];
    if (room && room.roomFilters) {
        room.roomFilters.forEach(roomFilter => {
            if (roomFilter.categoryName === "Amenities") {
                roomFilter.filters.forEach(filter => {
                    amenities.push(filter.filterName)
                });
            }
        });
    }
    return amenities;
}