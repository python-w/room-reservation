export default function generateGoogleMapsUrl(address) {
    if (address) {
        const { addressLine1, city, state, postalCode, country } = address;
        const encodedAddress = encodeURIComponent(`${addressLine1}, ${city}, ${state}, ${postalCode}, ${country}`);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        return googleMapsUrl;
    }
}