import React, { Component } from 'react';

import SiteNavigation from './containers/navbar';

class App extends Component {
  render() {
    return (
        <div>
            <SiteNavigation />
            {this.props.children}
        </div>
    );
  }
}

export default App;
