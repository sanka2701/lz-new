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
import ArticleDetail from './containers/article/article_detail';
import ArticleList from './containers/article/article_list';
import ArticleEditor from './containers/article/article_editor';
import EventEditor from './containers/event/event_editor';
import EventList from './containers/event/event_list';
import EventDetail from './containers/event/event_detail';
import EventListManage from './components/event/event_list_manage';
import UserList from './containers/user/userList';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <App>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/users" component={UserList} />
                            <Route exact path="/events" component={EventList} />
                            <Route exact path="/articles" component={ArticleList} />
                            <Route exact path="/events/manage" component={EventListManage} />
                            <Route path="/events/edit/:eventId?/:placeId?" component={EventEditor} />
                            <Route path="/events/:eventId/:placeId" component={EventDetail} />
                            <Route path="/articles/edit/:articleId?" component={ArticleEditor} />
                            <Route path="/events/:articleId" component={ArticleDetail} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </App>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
