import React, { Component } from 'react';
import EditProjectNewSectionTitleContainer from './EditProjectNewSectionTitleContainer'
import EditProjectNewResearchContainer from '../containers/EditProjectNewResearchContainer';
import EditProjectNewGraphContainer from '../containers/EditProjectNewGraphContainer';

class EditProjectNewContainer extends Component {
  render(){
    return (
      <div id='add-new'>
        <EditProjectNewSectionTitleContainer saveMethod={"POST"} id='add-new-section-title' />
        <EditProjectNewResearchContainer id='add-new-research' parentId='' randomId='add-new-random-data' preliminaryId='add-new-preliminary-data' researchId='add-new-research-data' />
        <EditProjectNewGraphContainer saveMethod={"POST"} id='add-new-graph' />
      </div>
    )
  }
}

export default EditProjectNewContainer;
