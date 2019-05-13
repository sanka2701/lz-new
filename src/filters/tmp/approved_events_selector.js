import {createSelector} from 'reselect';
import {POSTS_PER_PAGE} from '../../utils/constant';
import {chunk, map} from 'lodash';
import {dateRangeOverlap, isPointWithinCircle} from "../../utils/helpers";

const getCurrentPage = ({events}) => events.currentPage;
const getEvents = ({events}) => events.byId;
const getFilter = ({events}) => events.filter;
const getPlaces = ({places}) => places.byId;

export const approvedEventsSelector = createSelector(
	[getEvents],
	(events) => {
		return Object.values(events).filter((event) => event.approved);
	}
);

export const eventsPageCountSelector = createSelector(
	[approvedEventsSelector],
	(approvedEvents) => Math.ceil(approvedEvents.length / POSTS_PER_PAGE)
);

export const filteredEventsSelector = createSelector(
	[approvedEventsSelector, getFilter, getPlaces,  ],
	(events, filter, places ) => {
		return ( events && Object.keys(places).length )
			? events.filter(event => {
				const {place} = filter;
				const {lat, lon} = places[event.placeId];

				let fits = true;
				fits = fits && (
					filter.tags.length > 0
						? event.tags.some(tag => map(filter.tags, 'id').includes(tag.id))
						: true
				);
				fits = fits && (
					filter.startDate || filter.endDate
						? dateRangeOverlap(event.startDate, event.endDate, filter.startDate, filter.endDate)
						: true
				);
				fits = fits && (
					place.center && place.radius
						? isPointWithinCircle(place.center, place.radius, {lat, lon})
						: true
				);

				return !filter.isSet || fits;
			})
			: {};
	}
);

export const currentPageEventsSelector = createSelector(
	[filteredEventsSelector, getCurrentPage],
	(approvedEvents, currentPage) => {
		const arr = chunk(approvedEvents, POSTS_PER_PAGE);
		return arr[currentPage - 1]
	}
);