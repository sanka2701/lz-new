import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import localeReducer from './reducer_locale';
import authReducer from './reducer_auth';
import placesReducer from './reducers_places';

const rootReducer = combineReducers({
    form: formReducer,
    locale: localeReducer,
    auth: authReducer,
    places: placesReducer
});

export default rootReducer;