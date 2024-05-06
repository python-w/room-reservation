// Calculate Discounted Amount
export const calculateDiscountedAmount = (roomRate, discountPercentage) => {
    const discountAmount = roomRate * (discountPercentage / 100);
    return discountAmount;
}

// Calculate Discounted Room Rate
export const calculateDiscountedRoomRate = (roomRate, discountPercentage) => {
    const discountAmount = roomRate * (discountPercentage / 100);
    const discountedRoomRate = roomRate - discountAmount;
    return discountedRoomRate;
}

//Calculate VAT On Discounted Rate
export const calculateVATOnDiscountedRate = (originalPrice, discountPercentage, vatPercentage) => {
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);
    const vatAmount = discountedPrice * (vatPercentage / 100);
    return vatAmount;
}
