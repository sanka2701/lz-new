import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SiteNavigation from './containers/navbar';
import { loginUserByToken } from "./actions/index";
import axios from 'axios';

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

        const jwtToken = localStorage.getItem('token');
        if(jwtToken) {
            console.log("Token found: ", jwtToken);
            this.props.loginUserByToken(jwtToken);
        }
    }

    render() {
        return (
            <div>
                <SiteNavigation />
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(connect(null, {loginUserByToken})(App));