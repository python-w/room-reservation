export const calculateDiscountedRoomRate = (roomRate, discountPercentage) => {
    const discountAmount = roomRate * (discountPercentage / 100);
    const discountedRoomRate = roomRate - discountAmount;
    return discountedRoomRate;
}