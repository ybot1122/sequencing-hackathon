import React, { Component } from 'react';
import LoginScreen from './LoginScreen';
import ProfileSelector from './ProfileSelector';
import parse from 'url-parse';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      profile: null
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

  viewProfileCallback(id, name, response) {
    this.setState({
      profile: {
        id, name, response
      }
    });
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
    } else if (!this.state.profile) {
      return <ProfileSelector accessToken={this.state.loggedIn} />;
    } else {
      return <h1>{this.state.profile.name}</h1>;
    }
  }
}

export default App;
