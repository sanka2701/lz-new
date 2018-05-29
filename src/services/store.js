import { createStore, applyMiddleware } from 'redux';
import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import skLocaleData from 'react-intl/locale-data/sk'
import plLocaleData from 'react-intl/locale-data/pl'

import reducers from '../reducers';
import { LOCALE_CHANGED } from '../actions';

addLocaleData([...enLocaleData, ...skLocaleData, ...plLocaleData]);

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

store.dispatch({type: LOCALE_CHANGED, payload: 'en'});

export default store;

