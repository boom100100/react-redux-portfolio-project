import React, { Component } from 'react';
import EditProjectNewSectionTitleComponent from '../components/EditProjectNewSectionTitleComponent'
import EditProjectNewResearchComponent from '../components/EditProjectNewResearchComponent';
import EditProjectNewGraphComponent from '../components/EditProjectNewGraphComponent';

class EditProjectNewContainer extends Component {
  render(){
    return (
      <div id='add-new'>
        <EditProjectNewSectionTitleComponent />
        <EditProjectNewResearchComponent />
        <EditProjectNewGraphComponent />
      </div>
    )
  }
}

export default EditProjectNewContainer;
