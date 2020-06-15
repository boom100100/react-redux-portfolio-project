import React from 'react';
import NewRandomDataContainer from '../containers/NewRandomDataContainer';
import NewPreliminaryDataContainer from '../containers/NewPreliminaryDataContainer';
import NewResearchDataContainer from '../containers/NewResearchDataContainer';

const EditProjectNewResearchComponent = (props) => {
  return (
    <div id={props.parentId}>
      <NewRandomDataContainer id={props.randomId} saveMethod={"POST"} />
      <NewPreliminaryDataContainer id={props.preliminaryId} saveMethod={"POST"} />
      <NewResearchDataContainer id={props.researchId} saveMethod={"POST"} />
    </div>
  )
}

export default EditProjectNewResearchComponent;
