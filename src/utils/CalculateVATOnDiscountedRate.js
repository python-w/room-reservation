export const calculateVATOnDiscountedRate = (originalPrice, discountPercentage, vatPercentage) => {
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);
    const vatAmount = discountedPrice * (vatPercentage / 100);
    return vatAmount;
}
