import React, { Component } from 'react';
import logo from './style/logo.svg';
import './style/App.css';
import CKEditor from './components/ckeditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <CKEditor/>
      </div>
    );
  }
}

export default App;
