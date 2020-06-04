import React from 'react';
import * as editHelpers from '../containers/helpers/EditProjectHelpers';

const EditProjectDataComponent = (props) => {
  const doRender = () => {
    console.log('EditProjectDataComponent props', props);
    console.log('props.project', props.project);
    return document.getElementById('edit-project-parent') != null ? editHelpers.modifyElements(props.project) : undefined;
  }

  const doListen = () => {
    props.state.addEventListener('change', doRender);
  }
  // let state = {values: doRender()}


  return (
    <div id='edit-project-data'>
      {doRender()}
    </div>
  )
}

export default EditProjectDataComponent;
