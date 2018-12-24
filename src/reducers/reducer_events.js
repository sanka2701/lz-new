import {
	GET_EVENTS_REQUEST,
	CHANGE_EVENT_PAGE,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	RESET_EVENT_FILTER,
	SET_EVENT_FILTER
} from '../actions/types';
import _ from 'lodash';

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

export default function (state = defaultState, action) {
	switch (action.type) {
		case GET_EVENTS_SUCCESS:
			const {events} = action.payload;
			return {
				...state,
				byId: _.mapKeys(events, 'id'),
				ids: _.map(events, 'id'),
				isLoading: false
			};
		case GET_EVENTS_FAILURE:
			return {...state, isLoading: false};
		case GET_EVENTS_REQUEST:
			return {...state, isLoading: true};
		case CHANGE_EVENT_PAGE:
			return {...state, currentPage: action.payload.pageIndex};
		case SET_EVENT_FILTER:
			const { filter } = action.payload;
			return {...state,
				filter: {
					...state.filter,
					...filter,
					isSet: true,
				}
			};
		case RESET_EVENT_FILTER:
			return {...state, filter: defaultFilter };
		default:
			return state;
	}
}