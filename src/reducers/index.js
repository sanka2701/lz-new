import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import localeReducer from './reducer_locale';
import authReducer from './reducer_auth';
import placesReducer from './reducer_places';
import articlesReducer from './reducer_articles';
import eventsReducer from './reducer_events';
import errorReducer from './reducer_error';
import usersReducer from './reducer_users';
import potwReducer from './reducer_potw';

const rootReducer = combineReducers({
    form: formReducer,
    locale: localeReducer,
    auth: authReducer,
    places: placesReducer,
    articles: articlesReducer,
    events: eventsReducer,
    users: usersReducer,
    error: errorReducer,
    photos: potwReducer
});

export default rootReducer;