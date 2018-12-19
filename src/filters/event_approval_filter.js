import { createSelector } from 'reselect';
import { POSTS_PER_PAGE } from '../utils/constant';
import _ from 'lodash';

const getCurrentPage = (events) => events.currentPage;
const getEventIds = (events) => events.ids;
const getApprovedEvents = ( events, {approved} ) => (
    Object.values(events.byId)
        .filter((event) => event.approved === approved)
);

export const makeGetEventsByApproval = () => createSelector(
    [ getApprovedEvents, getCurrentPage, getEventIds ],
    ( approvedEvents, currentPage, eventIds ) => {
        const filteredIds = _.map(approvedEvents, 'id');
        const ids = _.filter(eventIds, (id) => filteredIds.includes(id)); //to keep order of the ids
        return {
            byId: _.mapKeys(approvedEvents, 'id'),
            pageCount: Math.ceil(ids.length / POSTS_PER_PAGE),
            pages: _.chunk(ids, POSTS_PER_PAGE),
            currentPage,
            ids
        }
    }
);