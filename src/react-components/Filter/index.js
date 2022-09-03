import React from "react";
import { uid } from "react-uid";

import "./styles.css";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

import FilterEntry from './FilterEntry/index';

/* Component for the Filter in the RightSideBar */
class Filter extends React.Component { 

  render() {
    const { entries, addSelection, clearSelections, onSessionsPage, sessionAction } = this.props

    return (
      <div className="filter-div">
        <div id="filter-header">
          <div id="filter-title">Filters</div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={ sessionAction }
            disableElevation
            onClick={ () => clearSelections(onSessionsPage) }
            startIcon={<DeleteIcon />}
            style={{backgroundColor:"blue",color:"white"}}
          >
            Clear Filters
          </Button>
        </div>
        
        <div className="filter-entries">
          {entries.map(entry => (
              <FilterEntry
                key={ uid(entry) }
                entry={ entry }
                onSessionsPage={ onSessionsPage }
                addSelection={ addSelection }
                sessionAction={ sessionAction }/>
            ))}
        </div>
      </div>
    );
  }
}

export default Filter;