export const getRatingColor = (rating) => {
    const red = Math.round(255 - (rating * 20));
    const green = Math.round(rating * 20);

    return `rgb(${red},${green},0)`;
}