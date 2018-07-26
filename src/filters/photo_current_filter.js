import { createSelector } from 'reselect';
import _ from 'lodash';

const getPhotosById = (photos) => photos.byId;

export const makeGetCurrentPotw = () => createSelector(
    [ getPhotosById ],
    ( photosById ) => {
        return _.orderBy(_.values(photosById), ['dateAdded'], ['asc'])[0]
    }
);


