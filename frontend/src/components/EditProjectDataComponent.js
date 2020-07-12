import React from 'react';
import * as editHelpers from '../containers/helpers/EditProjectHelpers';

const EditProjectDataComponent = (props) => {
  const doRender = () => {
    return document.getElementById('edit-project-parent') != null ? editHelpers.modifyElements(props.project) : undefined;
  }

  return (
    <div id='edit-project-data'>
      {doRender()}
    </div>
  )
}

export default EditProjectDataComponent;
