import React, { Component } from 'react';
import EditProjectNewSectionTitleContainer from './EditProjectNewSectionTitleContainer'
import EditProjectNewResearchContainer from '../containers/EditProjectNewResearchContainer';
import EditProjectNewGraphContainer from '../containers/EditProjectNewGraphContainer';
import { addSectionToProject, addToBackend, addDataToProject } from '../actions/ProjectActions';
import { connect } from 'react-redux';

class EditProjectNewContainer extends Component {
  render(){
    return (
      <div id='add-new'>
        <EditProjectNewSectionTitleContainer myCall={this.props.addToBackend} myCallback={this.props.addSectionToProject} relativeUrl={"/section_titles"} saveMethod={"POST"} id='add-new-section-title' />
        <EditProjectNewResearchContainer id='add-new-research' parentId='' randomId='add-new-random-data' preliminaryId='add-new-preliminary-data' researchId='add-new-research-data' />
        <EditProjectNewGraphContainer myCall={this.props.addToBackend} myCallback={this.props.addDataToProject} relativeUrl={"/section_title_children"} saveMethod={"POST"} id='add-new-graph' />
      </div>
    )
  }
}

export default connect(null, { addSectionToProject, addToBackend, addDataToProject })(EditProjectNewContainer);
