import React from "react";
import {Link} from "react-router-dom"
import "./styles.css";
import {Input, ListItemText, TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import sessionHelpers from "../../actions/sessions";

const { addSession, editSession, deleteSession, addSessionMember, removeSessionMember } = sessionHelpers;


/* Component for the main center component */
class Session extends React.Component {
    
    constructor(props) {
        super(props)
        if (this.props.viewing || this.props.editing) {
            this.state.title = this.props.session.title
            this.state.subject = this.props.session.subject
            this.state.username = this.props.session.username
            this.state.startDate = this.props.session.startDate
            this.state.startTime = this.props.session.startTime
            this.state.endDate = this.props.session.endDate
            this.state.endTime = this.props.session.endTime
            this.state.size = this.props.session.size
            this.state.members = this.props.session.members
            }
        }
    
    state = {
        
        isView:false,
        isEdit:false,
        isCreate:true,
        showDialog:false,

        title:"",
        subject:"",
        username:"",
        startDate:"",
        startTime:"",
        endDate:"",
        endTime:"",
        size:"",
        members:[],
        

        sizes: ["1-5","6-10", "11-15","16-20"],
    };

    handleInputChange = session => {
        const {name, value} = session.target;

        this.setState({
            [name]: value
        });
    };


    closeDialog = () => {
        this.setState({ showDialog: false })
      }

    openDialog = () => {
        this.setState({ showDialog: true})
      }

    addMember = (session) => {
        if(session.members.includes(this.props.userName)){
            removeSessionMember(this.props.refreshSessions, session, this.props.userName);
        }
        else {
            addSessionMember(this.props.refreshSessions, session, this.props.userName);
        }
    }

    removeMember = (session, member) => {
        const members = this.state.members
        const index = members.indexOf(member)
        members.splice(index, 1)

        this.setState({ members: members})

        removeSessionMember(this.props.refreshSessions, session, member);
    }


    render() {
        const {isAdmin, session, sessions, userName, setSessions, viewSessions, viewing, editing}  = this.props;


        let lastButton; 
        
        let join_value = "Join"
        if (typeof(session) !== "undefined"){
            if (session.members.includes(userName)) {
            join_value = "Joined"
            }
        }

        if (editing) {
            lastButton = 
                (
                <div className="right_header">
                    <div className="last_button">
                        <Button  variant="outlined" color="primary" onClick={() => deleteSession(viewSessions, session)}>
                            Delete 
                        </Button>
                    </div>
                     <div className="last_button">
                        <Button  variant="outlined" color="primary" onClick={() => editSession(this, sessions, userName, setSessions, viewSessions, session)}>
                            Save
                        </Button>
                    </div>
                </div>
                )
        }
        else if (viewing) {
            if (userName !== this.state.username) {
            lastButton =  (<div  className="right_header" >
                <Button  variant="outlined" color="primary" onClick={() => {
                        this.addMember(session)
                        viewSessions()
                        }}>
                    {join_value}
                
                </Button>
            </div>)} else { 
                lastButton = (<div></div>)
            }
        }
        else {
            lastButton = (<div className="right_header">
            {console.log(this)}
            <Button fullWidth variant="outlined" color="primary" 
            onClick={() => 
                addSession(this, sessions, userName, setSessions, viewSessions)}>
                Create Session
            </Button>
        </div>)
        }
        return (
            <div className="session-div">
                
                <div className="header_page">
                    <div className="left_header">
                        <div className="last_button">
                            <IconButton color="primary" onClick={viewSessions}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </div>
                        <div className="page-name">
                            Session
                        </div>
                    </div>
                {lastButton}  
                </div>
                   
                <div className="form-components">
                    <div className="section">
                        <div className="section-name">
                            title:
                        </div>
                        <div className="title">
                        <TextField 
                            id="outlined-search"
                            value={this.state.title}
                            name='title'
                            type="search"
                            variant="outlined"
                            onChange={this.handleInputChange}
                            
                            InputProps={{
                                readOnly: viewing,
                              }}/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Subject:
                        </div>
                        <div className="purpose">
                            <TextField 
                                id="outlined-search"
                                value={this.state.subject}
                                name='subject'
                                type="search"
                                variant="outlined"
                                onChange={this.handleInputChange}
                                
                                InputProps={{
                                    readOnly: viewing,
                                  }}/>
                        </div>
                    </div>
                    <div  className="section">
                        <div className="section-name">
                            Group Size:
                        </div>
                        <div className="group-size">
                        <TextField
                            id="outlined-select"
                            select
                            name='size'
                            value={this.state.size}
                            onChange={this.handleInputChange}
                            
                            variant="outlined"
    
    
                            InputProps={{
                                readOnly: viewing,
                              }}
                            >
                            {this.state.sizes.map(option => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Start Date:
                        </div>
                        <div className="startDate">
                            <TextField
                                id="startDate"
                                type="date"
                                name="startDate"
                                value={this.state.startDate}
                                // defaultValue="2020-01-01"
                                onChange={this.handleInputChange}
    
                                InputProps={{
                                    readOnly: viewing
                                  }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Start Time:
                        </div>
                        <div className="startTime">
                            <TextField
                                id="startTime"
                                type="time"
                                name="startTime"
                                value={this.state.startTime}
                                // defaultValue="06:00"
                                onChange={this.handleInputChange}
    
                                InputProps={{
                                    readOnly: viewing
                                  }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            End Date:
                        </div>
                        <div className="startDate">
                            <TextField
                                id="endDate"
                                type="date"
                                name="endDate"
                                value={this.state.endDate}
                                // defaultValue="2020-01-01"
                                onChange={this.handleInputChange}
    
                                InputProps={{
                                    readOnly: viewing
                                  }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            End Time:
                        </div>
                        <div className="startTime">
                            <TextField
                                id="endTime"
                                type="time"
                                name="endTime"
                                value={this.state.endTime}
                                // defaultValue="06:00"
                                onChange={this.handleInputChange}
    
                                InputProps={{
                                    readOnly: viewing
                                  }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </div>
                    </div>                   
                </div>
                
           
            </div>
          );
    }
  }
  
  export default Session;