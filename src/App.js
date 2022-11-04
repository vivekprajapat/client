// It is app.js file.

import React from "react";

import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./react-components/Login";
import Home from "./react-components/Home";

import { readCookie } from "./actions/users";

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this); // sees if a user is logged in.
  }

  state = {
    currentUser: null,
    isAdmin: false,
  };

  setSessions = (sessions) => {
    this.setState({
      sessions: sessions,
    });
  };

  routing() {
    if (!this.state.currentUser) {
      return (
        <div>
          <Login app={this} />
        </div>
      );
    } else {
      return <Home app={this} state={this.state} setSessions={this.setSessions} />;
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>{this.routing()}</BrowserRouter>
      </div>
    );
  }
}

export default App;
