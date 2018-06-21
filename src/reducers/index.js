import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import localeReducer from './reducer_locale';
import authReducer from './reducer_auth';
import placesReducer from './reducer_places';
import errorReducer from './reducer_error';

const rootReducer = combineReducers({
    form: formReducer,
    locale: localeReducer,
    auth: authReducer,
    places: placesReducer,
    error: errorReducer
});

export default rootReducer;