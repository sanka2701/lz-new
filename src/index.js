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
import EventEditor from './containers/event/event_editor';
import EventList from './containers/event/event_list';
import EventDetail from './containers/event/event_detail';
import EventListManage from './components/event/event_list_manage';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <App>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/eventsEdit/:eventId?/:placeId?" component={EventEditor} />
                            {/*<Route path="/eventsEdit" component={EventEditor} />*/}
                            <Route exact path="/events" component={EventList} />
                            <Route exact path="/events/manage" component={EventListManage} />
                            {/*<Route path="/events/edit/:eventId?/:placeId?" component={EventEditor} />*/} //todo: breaks down ckeditor
                            <Route path="/events/:eventId/:placeId" component={EventDetail} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </App>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
