import { createSelector } from 'reselect';
import { UPCOMING_EVENTS_COUNT } from '../utils/constant';
import _ from 'lodash';

const getEventIds = (events) => events.ids;
const getEventsById = (events) => events.byId;

// todo: filter only approved events
export const makeGetUpcomingEvents = () => createSelector(
    [ getEventsById ],
    ( eventsById ) => {
        return _.orderBy(_.values(eventsById), ['startDate'], ['asc']).slice(0, UPCOMING_EVENTS_COUNT)
    }
);


