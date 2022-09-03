
function getSessions(home, main) {
    const url = '/sessions'

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get sessions");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            home.setState({
                sessions: json,
                filteredSessions: (home.state.appliedFilters.length !== 0) ? filterSessions(home.state.appliedFilters, json) : json
            }, () => main.render());
        })
        .catch(error => {
            console.log(error);
            home.setState({
                sessions: [],
                filteredSessions: []
            }, () => main.render());
        });
}

function addSession(sessionForm, sessions, username, setSessions, viewSessions) {
    const {title, subject, startDate, startTime,endDate , endTime ,  size } = sessionForm.state;

    const newSession = {
        title,
        subject,
        username,
        startDate,
        startTime,
        endDate,
        endTime,
        size,
        members: [],
    };
    const url = '/sessions/create'

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newSession),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If session was added successfully, go back to sessions page
                
                viewSessions();
            } else {
                // TODO: handle what happens if session wasn't added successfully.
            }
        })
        .catch(error => {
            console.log(error);
        });

    viewSessions();
}

function editSession(sessionForm, sessions, username, setSessions, viewSessions, session) {
    const session_id = session._id;

    const {title, subject, startDate, startTime,endDate , endTime ,  size} = sessionForm.state;

    const edited_session = {
        title,
        subject,
        username,
        startDate,
        startTime,
        endDate,
        endTime,
        size,
        members: session.members,
    };
    const url = `/sessions/${session_id}`; 

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(edited_session),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If session was added modified, go back to sessions page
                viewSessions();
            } else {
                // TODO: handle what happens if session wasn't added successfully.
            }
        })
        .catch(error => {
            console.log(error);
        });

    viewSessions();
}

function deleteSession(viewSessions, session) {
    const session_id = session._id;

    const url = `/sessions/${session_id}`; 

    const request = new Request(url, {
        method: "delete",
    });
    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If session was deleted, go back to sessions page  
                viewSessions();
            } else {
                // TODO: handle what happens if session wasn't added successfully.
            }
        })
        .catch(error => {
            console.log(error);
        });
    viewSessions();
}

function addSessionMember(refreshSessions, session, username) {
    const session_id = session._id;

    const url = `/sessions/member/${session_id}`; 

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify({username}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If the member was added successfully, retrieve sessions list from database.
                refreshSessions();
            } else {
                // TODO: handle what happens if session wasn't added successfully.
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function removeSessionMember(refreshSessions, session, username) {
    const session_id = session._id;

    const url = `/sessions/member/${session_id}`; 

    const request = new Request(url, {
        method: "DELETE",
        body: JSON.stringify({username}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If the member was added successfully, retrieve sessions list from database.
                refreshSessions();
            } else {
                // TODO: handle what happens if session wasn't added successfully.
            }
        })
        .catch(error => {
            console.log(error);
        });
}


/** Filter Functions **/

function sessionMatchesFilters(filters, session) {
    // Loop through all filters
    for (let i=0; i < filters.length; i++) {
        if (filters[i].name === "titles") {
            // Iterate through all filtered titles
            for (let j=0; j < filters[i].values.length; j++) {
                if (session.title === filters[i].values[j]) {
                    return true
                }
            }
        } else if (filters[i].name === "username") {
            // Iterate through all filtered usernames
            for (let j=0; j < filters[i].values.length; j++) {
                if (session.username === filters[i].values[j]) {
                    return true
                }
            }
        } else if (filters[i].name === "Group Size") {
            // Iterate through all filtered Group Sizes
            for (let j=0; j < filters[i].values.length; j++) {
                if (session.size === filters[i].values[j]) {
                    return true
                }
            }
        }
    }

    return false
}

function filterSessions(filters, sessions) {
    return sessions.reduce((filteredSessions, session) => {
        if (sessionMatchesFilters(filters, session)) {
            filteredSessions.push(session)
        }
        return filteredSessions
    }, [])
}

function userMatchesFilters(filters, user) {
    // Loop through all filters
    for (let i=0; i < filters.length; i++) {
        if (filters[i].name === "username") {
            // Iterate through all filtered usernames
            for (let j=0; j < filters[i].values.length; j++) {
                if (user.username === filters[i].values[j]) {
                    return true
                }
            }
        }
    }

    return false
}

function filterUsers(filters, users) {
    return users.reduce((filteredUsers, user) => {
        if (userMatchesFilters(filters, user)) {
            filteredUsers.push(user)
        }
        return filteredUsers
    }, [])
}

export default {
    getSessions,
    addSession,
    filterSessions,
    filterUsers,
    editSession,
    deleteSession,
    addSessionMember,
    removeSessionMember,
}