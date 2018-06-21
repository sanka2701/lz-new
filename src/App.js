import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SiteNavigation from './containers/navbar';
import { get } from "./actions/index";
import { AUTH_USER, AUTH_ERROR } from './actions/types'
import axios from 'axios';
import ModalExample from "./containers/error/modal";

import Spinner from './components/ui/spinner';

class App extends Component {
    componentDidMount() {

        axios.interceptors.request.use(
            config => {
                const jwtToken = localStorage.getItem('token');
                if(jwtToken) {
                    config.headers.Authorization = `Bearer ${jwtToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        if(localStorage.getItem('token')) {
            console.log("Token found: ", localStorage.getItem('token'));
            const request = {
                endpoint: 'user',
                params: {},
                successAction: AUTH_USER,
                failureAction: AUTH_ERROR
            };
            this.props.get(request);
        }
    }

    render() {
        return (
            <div>
                <SiteNavigation />
                <Spinner />
                <ModalExample />
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(connect(null, {get})(App));