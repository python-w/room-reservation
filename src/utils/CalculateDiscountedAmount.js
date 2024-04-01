export const calculateDiscountedAmount = (roomRate, discountPercentage) => {
    const discountAmount = roomRate * (discountPercentage / 100);
    return discountAmount;
}