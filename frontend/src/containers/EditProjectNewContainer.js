import React, { Component } from 'react';
import EditProjectNewSectionTitleContainer from '../containers/EditProjectNewSectionTitleContainer'
import EditProjectNewResearchContainer from '../containers/EditProjectNewResearchContainer';
import EditProjectNewGraphContainer from '../containers/EditProjectNewGraphContainer';

class EditProjectNewContainer extends Component {
  render(){
    return (
      <div id='add-new'>
        <EditProjectNewSectionTitleContainer />
        <EditProjectNewResearchContainer />
        <EditProjectNewGraphContainer />
      </div>
    )
  }
}

export default EditProjectNewContainer;
