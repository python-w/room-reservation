// Get 4k
export function get4k(target) {
    const vwContext = 2201 * 0.01 * 1;
    return (target / vwContext) * 1 + "vw";
}

// Breakpoints
export const mediaQueries = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1025,
    xl: 1366,
    xxxl: 2201,
};
