import React from "react";

import "./styles.css";
import LeftSideBar from "../LeftSideBar/index";
import MainComponent from "../MainComponent/index";
import RightSideBar from "../RightSideBar/index";
import { getUsersName } from "../../actions/users";
import sessionHelpers from "../../actions/sessions";
const { filterSessions, filterUsers, getSessions } = sessionHelpers;

/* Component for the Home page */
class Home extends React.Component {
  constructor(props) {
    super(props);
    getUsersName(this);
  }
  
  state = {
    onSessionsPage: true,
    sessionAction: false, 
   
    // whether or not we're doing an action on an session; so creating, editing, viewing
    /*
    appliedFilters is list of objects with a name and list of values

    */
    sessions: [],
    users: [],
    appliedFilters: [],
    filteredSessions: [],
    filteredUsers: []
  }

  setSessionAction = (b) => {
    this.setState({ sessionAction: b})
  }

  // Add a new applied filter to state.appliedFilters
  // updated state.filteredSessions with new filters
  addFilter = (name, value) => {
    const filters = this.state.appliedFilters
    let nameFound = false
    for (let i=0; i < filters.length; i++) {
      if (name === filters[i].name) {
        if (filters[i].values.indexOf(value) < 0) {
          filters[i].values.push(value)
        }
        nameFound = true
      }
    }

    if (!nameFound) {
      const newNameFilter = {
        name: name,
        values: [value]
      }
      filters.push(newNameFilter)
    }

    if (!this.state.onSessionsPage) {
      const filtered = filterUsers(filters, this.state.users)
      this.setState({ filteredUsers: filtered })
    } else {
      const filtered = filterSessions(filters, this.state.sessions)
      this.setState({ filteredSessions: filtered })
    }
    this.setState({ appliedFilters: filters })
  }

  // Called when Clear Filters button is pressed, clears all applied filters
  resetFilters = () => {
    this.setState({
      appliedFilters: [],
      filteredSessions: this.state.sessions,
      filteredUsers: this.state.users
    })
  }

  refreshUsers = () => {
    getUsersName(this)
  }

  refreshSessions = (main) => {
    getSessions(this, main);
  };

  setOnSessionsPage = (newValue) => {
    this.setState({ onSessionsPage: newValue })
  }
  

  render() {
    const { app, state } = this.props
    const { currentUser, isAdmin } = state
    

    return (
      <div className="home-div">
       
        <LeftSideBar
          app={app}
          username={currentUser}
          isAdmin={isAdmin}
          onSessionsPage={this.state.onSessionsPage}
          setOnSessionsPage={this.setOnSessionsPage}
        />

        <MainComponent
          user={
            this.state.users.filter((user) => user.username === currentUser)[0]
          }
          rating
          filteredSessions={this.state.filteredSessions}
          sessions={this.state.sessions}
          refreshSessions={this.refreshSessions}
          refreshUsers={this.refreshUsers}
          setSessions={this.props.setSessions}
          users={this.state.filteredUsers}
          isAdmin={isAdmin}
          onSessionsPage={this.state.onSessionsPage}
          setSessionAction={this.setSessionAction}
        />

        <RightSideBar
          username={currentUser}
          isAdmin={isAdmin}
          onSessionsPage={this.state.onSessionsPage}
          sessionAction={this.state.sessionAction}
          addFilter={this.addFilter}
          resetFilters={this.resetFilters}
        />
      </div>
    );
  }
}

export default Home;