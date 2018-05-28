import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './services/store';

import App from './App';
import SiteNavigation from './containers/navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <SiteNavigation />
                <App />
                {/*<Route path="" component={} />*/}
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
