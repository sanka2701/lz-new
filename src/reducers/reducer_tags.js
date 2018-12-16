import { mapKeys, map } from 'lodash';
import {
	GET_TAGS_SUCCESS,
	GET_TAGS_FAILURE,
	GET_TAGS_REQUEST,
	RESET_TAG_FILTER,
	SET_TAG_FILTER, POST_TAG_SUCCESS,
} from "../actions/types";

const defaultFilter =  {
	isSet: false,
	searchString: ''
};

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false,
	filter: defaultFilter
};

export default function (state = defaultState, action) {
	const { tags } = action.payload ? action.payload : {tags: []};
  switch(action.type) {
		case POST_TAG_SUCCESS:
			return {
				...state,
				byId: Object.assign(state.byId, mapKeys(tags, 'id')),
				ids: state.ids.concat(map(tags, 'id')),
				isLoading: false
			};
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        byId: mapKeys(tags, 'id'),
        ids: map(tags, 'id'),
        isLoading: false
      };
    case GET_TAGS_FAILURE:
      return {...state, isLoading: false};
    case GET_TAGS_REQUEST:
      return {...state, isLoading: true};
      //todo: handle delete
			//todo: handle set isLoading
		case SET_TAG_FILTER:
			const { filter } = action.payload;
			return {...state,
				filter: {
					...state.filter,
					...filter,
					isSet: true,
				}
			};
		case RESET_TAG_FILTER:
			return {...state, filter: defaultFilter };
    default:
      return state;
  }
}