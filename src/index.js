import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './services/store';

import App from './App';
import SiteNavigation from './components/navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

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
