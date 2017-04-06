import React, { Component } from 'react';

const profiles = [
  { name: "Homer", id: 227679 },
  { name: "Marge", id: 227628 },
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
  constructor(props) {
    super(props);
    this.fetchForId = this.fetchForId.bind(this);
    this.state = {
      isLoading: false
    }
  }

  fetchForId(id, name) {
    return () => {
      this.setState({
        isLoading: true
      });
      fetch('http://localhost:4000?token=' + this.props.accessToken + '&id=' + id)
        .then((response) => {
          return response.json()
        }).then((json) => {
          this.props.viewProfileCallback(id, name, json);
        });
    }
  }

  renderProfileTabs() {
    const result = [];
    profiles.forEach((el) => {
      result.push(
        <div className="profile" key={el.id} onClick={this.fetchForId(el.id, el.name)}>
          {el.name}
        </div>
      );
    });
    return result;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          FAKE LOADER
        </div>
      );
    }

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