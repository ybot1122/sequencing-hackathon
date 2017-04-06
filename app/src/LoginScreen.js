import React, { Component } from 'react';

const URL = "https://sequencing.com/oauth2/authorize?redirect_uri=http://localhost:2000&response_type=code&state=STATE&client_id=TobyHackathonAppDemo&scope=demo";

class LoginScreen extends Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to DNA-TV!</h1>
        <h2><a href={URL}>Login with Sequencing.com</a></h2>
      </div>
    );
  }

}

export default LoginScreen;