import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import logo from './logo.svg';
import parse from 'url-parse';
import './App.css';

const profiles = {
  Homer: 227679,
  Mage: 227628,
  Bart: 237697,
  Lisa: 237689,
  Maggie: 237691,
  Vito: 80605,
  Genghis: 80602,
  "Ba Shi Ba": 80599,
  Oba: 80600,
  Atiam: 141478,
  Ugg: 80632,
  Pebbles: 80633
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    };
  }

  componentWillMount() {
    const qs = parse(window.location.href).query;
    let accessToken;
    if (qs) {
      accessToken = qs.replace("?access_token=", "");
    }
    this.setState({ loggedIn: accessToken });
  }

  render() {
    fetch('http://localhost:9000/search/shows?q=girls')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });

    if (!this.state.loggedIn) {
      return <LoginScreen />;
    } else {
      return <h1>{this.state.loggedIn}</h1>;
    }
  }
}

export default App;
