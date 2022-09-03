import React from "react";
import {Link} from "react-router-dom";
import "./styles.css";
import SessionCard from "../SessionCard/index";
import { Button} from '@material-ui/core'; 
import Session from "../Session";
import UserList from "../UserList";
import UserProfile from "../UserProfile";

/* Component for the main center component */
class MainComponent extends React.Component {

  componentDidMount() {
    this.props.refreshSessions(this);
  }

  state = {
    viewing: false,
    creating: false,
    editing: false,
    session: {}
  };

  createSession = () => {
    this.props.setSessionAction(true)
    this.setState({ creating: true })
  };

  viewSessions = () => {
      this.props.setSessionAction(false)
      this.setState({
          viewing: false,
          creating: false,
          editing: false
      });

    this.props.refreshSessions(this);
  };

  onViewing = (session) => {
    this.props.setSessionAction(true)
    this.setState({
      viewing: true,
      creating: false,
      session: session
    })
  }

  onEditing = (session) => {

    this.props.setSessionAction(true)
    this.setState({
      viewing: false,
      creating: false,
      editing: true,
      session: session,
      sorted:false
    })
  }
  render() {
    const { user, filteredSessions, sessions, setSessions, users, isAdmin, onSessionsPage, refreshSessions, adminChangePassword } = this.props;

    if (isAdmin && !onSessionsPage) {
      return <div className="main-component-div">
        <UserList users={users} adminChangePassword={adminChangePassword} refreshUsers={this.props.refreshUsers}/>
      </div>
    }

    if (this.state.creating) {
      return (<Session 
                isAdmin={isAdmin} 
                sessions={sessions} 
                userName={user.username} 
                setSessions={setSessions} 
                viewSessions={this.viewSessions}
                refreshSessions={refreshSessions.bind(this, this)}/>)
    } else if (this.state.viewing || this.state.editing){
      return (<Session 
                isAdmin={isAdmin} 
                editing={this.state.editing} 
                viewing={this.state.viewing} 
                session={this.state.session} 
                sessions={sessions} 
                userName={user.username} 
                viewSessions={this.viewSessions}
                refreshSessions={refreshSessions.bind(this, this)}/>)
    }

    if (!isAdmin && !onSessionsPage) {
      return <div className="main-component-div">
        <UserProfile user={user} sessions={sessions} onEditing={this.onEditing} onViewing={this.onViewing} refreshSessions={refreshSessions.bind(this, this)}/>
      </div>
    }

    else {
    return (
      <div className="main-component-div">
        <div className="section-header" >
          <div className="page-name">
            Home
          </div>
          <div id='create-session' style={{display: 'flex',flexDirection: 'row'}}>
            <Button onClick={ () => { this.createSession()}} variant="outlined" color="primary" size="medium" style={{backgroundColor:"blue",color:"white"}}>
              Create Session
            </Button>
            
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="upcoming-sessions">
            <Button
              type="button"
              variant="outine"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              All Session
            </Button>
            <Button
              type="button"
              variant="outine"
              style={{ backgroundColor: "grey", color: "white" , marginLeft:'30px' }}
            >
              sort by Date
            </Button>
          </div>
        </div>
        {
          <div className="session-list">
            {filteredSessions.length === 0 ? (
              <div className="empty-list-text">
                No session match.
              </div>
            ) : 
            (
              filteredSessions.map((session) => (
                <SessionCard
                  username={user.username}
                  isAdmin={isAdmin}
                  onEditing={this.onEditing}
                  onViewing={this.onViewing}
                  session={session}
                  refreshSessions={refreshSessions.bind(this, this)}
                />
              ))
            )
          }
          </div>
        }
      </div>
    );}
  }
}

export default MainComponent;