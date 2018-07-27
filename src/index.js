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

// todo: move to router component
import Register from './containers/auth/register';
import Login from './containers/auth/login';
import Home from './containers/home';
import ArticleDetail from './containers/article/article_detail';
import ArticleTop from './containers/article/article_top';
import ArticleEditor from './containers/article/article_editor';
import EventEditor from './containers/event/event_editor';
import EventTop from './containers/event/event_top';
import EventManageTop from './containers/event/event_manage_top';
import EventDetail from './containers/event/event_detail';
import UserTop from './containers/user/user_top';
import PhotoManage from './containers/photo/photo_manage';

import moment from 'moment';
import 'moment/locale/sk';
import 'moment/locale/pl';
import 'moment/locale/en-gb';
moment.locale('en');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <App>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/potw" component={PhotoManage} />
                            <Route exact path="/users" component={UserTop} />
                            <Route exact path="/events" component={EventTop} />
                            <Route exact path="/articles" component={ArticleTop} />
                            <Route exact path="/events/manage" component={EventManageTop} />
                            <Route path="/events/edit/:eventId?/:placeId?" component={EventEditor} />
                            <Route path="/events/:eventId/:placeId" component={EventDetail} />
                            <Route path="/articles/edit/:articleId?" component={ArticleEditor} />
                            <Route path="/articles/:articleId" component={ArticleDetail} />
                            {/*<Route path="/" component={Home} />*/}
                            <Route path="/" component={EventTop} />
                        </Switch>
                    </App>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
