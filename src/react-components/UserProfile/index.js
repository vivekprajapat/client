import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import './styles.css';
import StarRateIcon from "@material-ui/icons/StarRate";
import SessionCard from "../SessionCard";

class UserProfile extends React.Component {
    state = {
        tab: 0
    };

    handleTabChange = (session, value) => {
        this.setState({
            tab: value
        });
    };

    sessionType() {
        const {user, sessions, onEditing, onViewing, refreshSessions} = this.props;

        if (this.state.tab === 0) {
            const filteredSessions = sessions.filter(session => session.username === user.username)
            if (filteredSessions.length !== 0) {
                return (
                    filteredSessions.map(session => (
                        <SessionCard
                            username={user.username}
                            onEditing={onEditing}
                            onViewing={onViewing}
                            session={session}
                            refreshSessions={refreshSessions}
                        />
                    ))
                )
            } else {
                return <div className="empty-list-text">You have not created any session.</div>
            }
            
        } else {
            const filteredSessions = sessions.filter(session => session.members.includes(user.username))
            if (filteredSessions !== 0) {
                return(
                    filteredSessions.map(session => (
                        <SessionCard
                            username={user.username}
                            onEditing={onEditing}
                            onViewing={onViewing}
                            session={session}
                            refreshSessions={refreshSessions}
                        />
                    ))
                )
            } else {
                return <div className="empty-list-text">You have not joined any session.</div>
            }
            
        }
    }

    render() {
        const {user} = this.props;
        const stars = [];
        for (let i=0; i < user.rating; i++) {
            stars.push(<StarRateIcon fontSize='large'/>)
        }

        return (
            <div id='user-profile'>
                <div id='user-info' >
                    <h1>Session</h1>
                </div>

                <Paper variant="outlined">
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab icon={<CreateIcon />} label="CREATED" />
                        <Tab icon={<GroupIcon />} label="JOINED" />
                    </Tabs>
                </Paper>
                <div className="session-list">
                    {this.sessionType()}
                </div>
            </div>
        )
    }
}

export default UserProfile;