import React from "react";

import "../../index.css";
import "./styles.css";


import { Button } from '@material-ui/core'; 

import sessionHelpers from '../../actions/sessions';
const { addSessionMember, removeSessionMember } = sessionHelpers;

/* Component for the Home page */
class SessionCard extends React.Component {
  
  state = {
    showDialog: false,
    showSavedDialog: false,
  }

  openDialog = () => {
    this.setState({ showDialog: true })
  }

  closeDialog = () => {
    this.setState({ showDialog: false })
  }

  openSavedDialog = () => {
    this.setState({ showSavedDialog: true })
  }

  closeSavedDialog = () => {
    this.setState({ showSavedDialog: false })
  }

  addMember = (session) => {
    if(session.members.includes(this.props.username)){
      removeSessionMember(this.props.refreshSessions, session, this.props.username);
    }
    else {
      addSessionMember(this.props.refreshSessions, session, this.props.username);
    }
  }

  render() {
  
    const {username, isAdmin,onEditing ,onViewing, session} = this.props 
    
    let join_value = "Join"
    if (session.members.includes(username)) {
      join_value = "Joined"
    }

    return (
      <div className="session-card">
        <div className="header">
          <div className="session-info">
            <div>
              <div className="title">{"TITLE : " + session.title}</div>
            </div>
          </div>
          <div className="username">{"USERNAME : " + session.username}</div>
        </div>
        <div className="header">
        <div className="session-subject">{"START DATE : " + session.startDate}</div>
        <div className="session-subject">{"START TIME : " + session.startTime}</div>
        </div>
        <div className="header">
        <div className="session-subject">{"END DATE : " + session.endDate}</div>
        <div className="session-subject">{"END TIME : " + session.endTime}</div>
        </div>
        <div className="session-subject">{"SUBJECT : " + session.subject}</div>
       
        <div className="actions">
          <div>
          </div>
          <div className="right_actions">
            {isAdmin || username === session.username ? (
              <div className="action-button" id="edit-button">
                <Button
                  className="cardbutton"
                  onClick={() => onEditing(session)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ backgroundColor: "#9784FF", color: "black" }}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div />
            )}
            <div className="action-button" id="view-button">
              <Button
                className="cardbutton"
                onClick={() => onViewing(session)}
                variant="outlined"
                color="primary"
                size="small"
                style={{ backgroundColor: "#9784FF", color: "black" }}
              >
                View
              </Button>
            </div>
            {!isAdmin && username !== session.username ? (
              <div className="action-button" id="join-button">
                <Button
                  className="cardbutton"
                  onClick={() => {
                    this.addMember(session);
                  }}
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ backgroundColor: "#9784FF", color: "black" }}
                >
                  {join_value}
                </Button>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>      
      </div>
    );
  }
}


export default SessionCard;