import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import localeReducer from './reducer_locale';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
   form: formReducer,
   locale: localeReducer,
   auth: authReducer
});

export default rootReducer;