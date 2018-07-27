import { createSelector } from 'reselect';

const getUsersById  = (users) => users.byId;
const getUserFilter = (users) => users.filter;

export const makeGetUsersByFilter = () => createSelector(
    [ getUsersById, getUserFilter, ],
    ( byId, filter ) => {
        // debugger;

        return Object.values(byId).filter(( user ) => {
            let equals = true;
            // todo: filter text fields based on string proximity
            Object.keys(filter).forEach( key => {
                equals = equals && user[key] === filter[key];
            });
            return equals;
        });
    }
);