import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    fetch('http://localhost:9000/search/shows?q=girls')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });

    return (
      <div className="App">
        <div className="App-header">
          <h2><a href="https://sequencing.com/oauth2/authorize?redirect_uri=http://localhost:2000&response_type=code&state=STATE&client_id=TobyHackathonAppDemo&scope=demo
">LOGIN</a></h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
