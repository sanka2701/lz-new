import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SiteNavigation from './containers/header/navbar';
import { get } from './actions/index';
import { AUTH_USER, AUTH_ERROR } from './actions/types';

// import ModalExample from './containers/error/modal';
// import Spinner from './components/ui/spinner';

import TopLogo from './components/header/logo/top_logo';

class App extends Component<{children: string}> {
  componentDidMount() {
    axios.interceptors.request.use(
      (config) => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
          config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    if (localStorage.getItem('token')) {
      console.log('Token found: ', localStorage.getItem('token'));
      const request = {
        endpoint: 'user',
        params: {},
        successAction: AUTH_USER,
        failureAction: AUTH_ERROR,
      };
      this.props.get(request);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <TopLogo />
        <SiteNavigation />
        <Container>
          {/* <Spinner /> */}
          {/* <ModalExample /> */}
          {children}
        </Container>
      </div>
    );
  }
}

export default withRouter(connect(null, { get })(App));
