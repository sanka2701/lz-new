import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SiteNavigation from './containers/navbar';
import { loginUserByToken } from "./actions/index";


class App extends Component {
    componentDidMount() {
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