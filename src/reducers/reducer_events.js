import {
	GET_EVENTS_REQUEST,
	CHANGE_EVENT_PAGE,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	RESET_EVENT_FILTER,
	SET_EVENT_FILTER, POST_EVENT_SUCCESS
} from '../actions/types';
import _ from 'lodash';
import {ROOT_URL, SERVER_URL_PLACEHOLDER} from "../utils/constant";
import {millisecondsToTime, replaceServerUrlPlaceholder} from "../utils/helpers";

const defaultFilter = {
	isSet: false,
	tags: [],
	startDate: null,
	endDate: null,
	place: {
		center: null,
		radius: 2000,
	},
};

const defaultState = {
	byId: {},
	ids: [],
	isLoading: false,
	currentPage: 1,
	filter: defaultFilter
};

const normalizeTime = millis => {
	return {
		label: millisecondsToTime(millis),
		millis
	}
};

const normalizeEventObject = event => {
	event.startTime = normalizeTime(event.startTime);
	event.endTime = normalizeTime(event.endTime);
	replaceServerUrlPlaceholder(event);
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case GET_EVENTS_SUCCESS:
			const { events } = action.payload;
			_.map(events, normalizeEventObject);

			return {
				...state,
				byId: _.mapKeys(events, 'id'),
				ids: _.map(events, 'id'),
				isLoading: false
			};
		case GET_EVENTS_FAILURE:
			return {...state, isLoading: false};

		//todo: does not work for update because backend does not return updated object
		//	Currenty the application always loads all the events when on home page so this does not make sense as of now.
		//
		// case POST_EVENT_SUCCESS:
		// 	const newState = {...state};
		// 	const postedEvents = action.payload.events || [];
		//
		// 	postedEvents.map(normalizeEventObject);
		// 	postedEvents.forEach(event => {
		// 		newState.byId[event.id] = event;
		// 		!newState.ids.includes(event.id) && newState.ids.push(event.id);
		// 	});
		//
		// 	return {
		// 		...newState,
		// 		isLoading: false
		// 	};

		case GET_EVENTS_REQUEST:
			return {...state, isLoading: true};
		case CHANGE_EVENT_PAGE:
			return {...state, currentPage: action.payload.pageIndex};
		case SET_EVENT_FILTER:
			const {filter} = action.payload;
			return {
				...state,
				filter: {
					...state.filter,
					...filter,
					isSet: true,
				}
			};
		case RESET_EVENT_FILTER:
			return {...state, filter: defaultFilter};
		default:
			return state;
	}
}