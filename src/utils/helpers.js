export const areCoordinatesValid = (coordinates) => {
    return coordinates
        && typeof (coordinates.lat) === 'number'
        && typeof (coordinates.lng) === 'number'
};