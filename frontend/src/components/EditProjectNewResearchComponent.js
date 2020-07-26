import React from 'react';
import NewRandomDataContainer from '../containers/NewRandomDataContainer';
import NewPreliminaryDataContainer from '../containers/NewPreliminaryDataContainer';
import NewResearchDataContainer from '../containers/NewResearchDataContainer';
import { addDataToProject, addToBackend, updateSectionState, updateSection, updateDataState, updateData } from '../actions/ProjectActions';
import { connect } from 'react-redux';

const EditProjectNewResearchComponent = (props) => {
  return (
    <div id={props.parentId}>
      <NewRandomDataContainer id={props.randomId} myCall={props.addToBackend} myCallback={props.addDataToProject} relativeUrl={"/section_title_children"} saveMethod={"POST"} />
      <NewPreliminaryDataContainer id={props.preliminaryId} myCall={props.addToBackend} myCallback={props.addDataToProject} relativeUrl={"/section_title_children"} saveMethod={"POST"} />
      <NewResearchDataContainer id={props.researchId} myCall={props.addToBackend} myCallback={props.addDataToProject} relativeUrl={"/section_title_children"} saveMethod={"POST"} />
    </div>
  )
}

export default connect(null, { addDataToProject, addToBackend, updateSectionState, updateSection, updateDataState, updateData })(EditProjectNewResearchComponent);
