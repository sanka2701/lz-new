import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './services/store';
import ConnectedIntlProvider from './containers/connected_intl_provider';

import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';

import registerServiceWorker from './services/registerServiceWorker';
import App from './App';

/*move to router component*/
import Register from './containers/auth/register';
import Login from './containers/auth/login';
import Home from './containers/home';
import EventEditor from './containers/event_editor';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <App>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/createEvent" component={EventEditor} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </App>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
