export const areCoordinatesValid = ({lat, lon}) => {
    return lat
        && lon
        && typeof (lat) === 'number'
        && typeof (lon) === 'number';
};

export const timeToMilliseconds = (hours, minutes) => (minutes * 60000 + hours * 3600000);