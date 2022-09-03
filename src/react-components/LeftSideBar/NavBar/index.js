import React from 'react';

import './styles.css';
import "../../../App.css";


import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'; 
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/* React Component to represent NavBar that's displayed on admin page */
class NavBar extends React.Component {

    render() {
      const { isAdmin, onSessionsPage, setOnSessionsPage } = this.props

      // Determine values of each link
      const linkInfo = [
        {
          link: "/home/sessions",
          name: "Home",
          icon: <HomeIcon style={{ color: "black" }} />,
        },
        {
          link: "/home/profile",
          name: "Profile",
          icon: (
            <AccountCircleIcon style={{ color: "black" }} />
          ),
        },
      ];
      if (isAdmin) {
        linkInfo[0] = { link: '/home/sessions', name: 'Sessions', icon: <EventIcon color="primary"/> }
        linkInfo[1] = { link: '/home/users', name: 'Users', icon: <PeopleIcon color="primary"/> }
      }

      return (
        <div className="nav-bar">
          <List>
            <Link
              className="unstyled-link"
              to={linkInfo[0].link}
              onClick={() => setOnSessionsPage(true)}
            >
              <ListItem
                button={true}
                divider={true}
                selected={onSessionsPage}
                key={"Sessions"}
                style={{ color: "black", backgroundColor: "#bfcae2" }}
              >
                <ListItemIcon>{linkInfo[0].icon}</ListItemIcon>
                <ListItemText primary={linkInfo[0].name} />
              </ListItem>
            </Link>
            <Link
              className="unstyled-link"
              to={linkInfo[1].link}
              onClick={() => setOnSessionsPage(false)}
            >
              <ListItem
                button={true}
                selected={!onSessionsPage}
                key={"Users"}
                style={{ color: "black",backgroundColor: "#bfcae2" }}
              >
                <ListItemIcon>{linkInfo[1].icon}</ListItemIcon>
                <ListItemText primary={linkInfo[1].name} />
              </ListItem>
            </Link>
          </List>
        </div>
      );
    }
}

export default NavBar;
