import React from 'react';
import NewRandomDataContainer from '../containers/NewRandomDataContainer';
import NewPreliminaryDataContainer from '../containers/NewPreliminaryDataContainer';
import NewResearchDataContainer from '../containers/NewResearchDataContainer';

const EditProjectNewResearchComponent = (props) => {
  return (
    <div id='add-new-research'>
      <NewRandomDataContainer />
      <NewPreliminaryDataContainer />
      <NewResearchDataContainer />
    </div>
  )
}

export default EditProjectNewResearchComponent;
