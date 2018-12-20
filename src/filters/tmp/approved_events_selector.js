import {createSelector} from 'reselect';
import {POSTS_PER_PAGE} from '../../utils/constant';
import {chunk, map} from 'lodash';
import {isPointWithinCircle} from "../../utils/helpers";
import _ from "lodash";

const getCurrentPage = ({events}) => events.currentPage;
const getEvents = ({events}) => events.byId;
const getFilter = ({events}) => events.filter;
const getPlaces = ({places}) => places.byId;

export const approvedEventsSelector = createSelector(
	[getEvents],
	(events) => {
		const approvedEvents = Object.values(events).filter((event) => event.approved);
		return approvedEvents;
	}
);

export const pageCountSelector = createSelector(
	[approvedEventsSelector],
	(approvedEvents) => Math.ceil(approvedEvents / POSTS_PER_PAGE)
);

export const currentPageEventsSelector = createSelector(
	[approvedEventsSelector, getCurrentPage],
	(approvedEvents, currentPage) => {
		const arr = chunk(approvedEvents, POSTS_PER_PAGE);
		return arr[currentPage - 1]
	}
);

export const getApprovedEventsPlaces = createSelector(
	[ approvedEventsSelector, getPlaces ],
	( events, places ) => {
		const requiredPlaceIds = map(events, 'placeId');
		return Object.values(places).filter( place => requiredPlaceIds.includes(place.id));
	}
);

export const filteredEventsSelector = createSelector(
	[currentPageEventsSelector, getFilter, getPlaces,  ],
	(events, filter, places ) => {
		return ( events && Object.keys(places).length )
			? events.filter(event => {
				const {place} = filter;
				const {lat, lon} = places[event.placeId];

				let fits = true;
				// fits = fits && filter.startDate
				// 	? event.startDate >= filter.startDate
				// 	: true;
				fits = fits && place.center && place.radius
					? isPointWithinCircle(place.center, place.radius, {lat, lon})
					: true;

				return fits
			})
			: {};
	}
);