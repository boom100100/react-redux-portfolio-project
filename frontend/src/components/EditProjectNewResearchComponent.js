import React from 'react';
import NewRandomDataContainer from '../containers/NewRandomDataContainer';
import NewPreliminaryDataContainer from '../containers/NewPreliminaryDataContainer';
import NewResearchDataContainer from '../containers/NewResearchDataContainer';

const EditProjectNewResearchComponent = (props) => {
  return (
    <div id={props.parentId}>
      <NewRandomDataContainer id={props.randomId} />
      <NewPreliminaryDataContainer id={props.preliminaryId} />
      <NewResearchDataContainer id={props.researchId} />
    </div>
  )
}

export default EditProjectNewResearchComponent;
