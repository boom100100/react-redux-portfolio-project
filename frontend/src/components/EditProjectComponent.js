import React from 'react';
import EditProjectObjectComponent from './EditProjectObjectComponent';
import EditProjectDataComponent from './EditProjectDataComponent';
import EditProjectLinksComponent from './EditProjectLinksComponent';
import EditProjectNewContainer from '../containers/EditProjectNewContainer';
import { connect } from 'react-redux';

const EditProjectComponent = (props) => {

  return (
    <div id='edit-project-parent'>
      <div>Loading...</div>
      <button onClick={e => props.functions.onSave(e)}>Save</button>

      <EditProjectObjectComponent myState={props.myState} saveProject={props.functions.saveProject} callbackType={'EDIT_PROJECT'} />
      <EditProjectDataComponent  project={props.project} />
      <EditProjectLinksComponent functions={props.functions} />
      <EditProjectNewContainer />


    </div>
  )
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id);

  return {
    project: state.projects[index]
  }
}

export default connect(mapStateToProps)(EditProjectComponent);
