import React, { Component } from 'react';

const URL = "https://sequencing.com/oauth2/authorize?redirect_uri=http://localhost:2000&response_type=code&state=STATE&client_id=TobyHackathonAppDemo&scope=demo";

const profiles = [
  { name: "Homer", id: 227679 },
  { name: "Mage", id: 227628 },
  { name: "Bart", id: 237697 },
  { name: "Lisa", id: 237689 },
  { name: "Maggie", id: 237691 },
  { name: "Vito", id: 80605 },
  { name: "Genghis", id: 80602 },
  { name: "Ba Shi Ba", id: 80599 },
  { name: "Oba", id: 80600 },
  { name: "Atiam", id: 141478 },
  { name: "Ugg", id: 80632 },
  { name: "Pebbles", id: 80633 }
];

class ProfileSelector extends Component {

  renderProfileTabs() {
    const result = [];
    profiles.forEach((el) => {
      result.push(
        <div className="profile" key={el.id} onClick={() => console.log(el.id)}>
          {el.name}
        </div>
      );
    });
    return result;
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome back Toby!</h1>
        <h2>Select a profile to view TV recommendations!</h2>
        {this.renderProfileTabs()}
      </div>
    );
  }

}

export default ProfileSelector;