import React, { Component } from 'react';
import EditProjectNewResearchComponent from '../components/EditProjectNewResearchComponent';

class EditProjectNewResearchContainer extends Component {
  render(){
    return (
      <div id='add-new-research'>
        New research holder.
        <EditProjectNewResearchComponent />

      </div>
    )
  }
}

export default EditProjectNewResearchContainer;
