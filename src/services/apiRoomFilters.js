export async function getRoomFilters() {
    try {
        const res = await fetch('http://localhost:5000/roomFilters');
        const filters = await res.json();

        if (!res.ok) {
            throw Error('Something went wrong. Please try again later.');
        }
        return filters;
    } catch (error) {
        throw Error('Failed to fetch filters. Please check your internet connection and try again.');
    }
}