import React from 'react';
import EditProjectObjectComponent from './EditProjectObjectComponent';
import EditProjectDataComponent from './EditProjectDataComponent';
import EditProjectLinksComponent from './EditProjectLinksComponent';
import EditProjectNewContainer from '../containers/EditProjectNewContainer';

const EditProjectComponent = (props) => {

  return (
    <div id='edit-project-parent'>
      <div>Loading...</div>
      <button onClick={props.functions.onSave}>Save</button>

      <EditProjectObjectComponent state={props.state} />
      <EditProjectDataComponent state={props.state} />
      <EditProjectLinksComponent functions={props.functions} />
      <EditProjectNewContainer />

      <button onClick={props.functions.onDelete}>Delete</button>
    </div>
  )
}

export default EditProjectComponent;
