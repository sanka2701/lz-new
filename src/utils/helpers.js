export const areCoordinatesValid = ({lat, lon}) => {
    let tmp = lat
        && lon
        && typeof (lat) === 'number'
        && typeof (lon) === 'number';
    return  tmp;
};

export const timeToMilliseconds = (hours, minutes) => (minutes * 60000 + hours * 3600000);