import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './services/store';
import App from './App';
import SiteNavigation from './containers/navbar';
import ConnectedIntlProvider from './containers/connectedIntlProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import registerServiceWorker from './services/registerServiceWorker';

/*move to router component*/
import Login from './containers/auth/login';
import Home from './containers/home';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <SiteNavigation />
                    <App />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
