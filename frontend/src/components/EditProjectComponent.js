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
      <button onClick={props.functions.onSave}>Save</button>

      <EditProjectObjectComponent state={props.state} />
      <EditProjectDataComponent state={props.state} project={props.project} />
      <EditProjectLinksComponent functions={props.functions} />
      <EditProjectNewContainer />


    </div>
  )
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  return {
    project: state.projects[id-1]
  }
}

export default connect(mapStateToProps)(EditProjectComponent);
