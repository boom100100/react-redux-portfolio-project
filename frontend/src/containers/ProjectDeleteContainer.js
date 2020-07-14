import React, {Component} from 'react';
import {deleteProject, deleteProjectState} from '../actions/ProjectActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectDeleteContainer extends Component {
  render(){ return (<><ProjectDeleteComponentConnected history={this.props.history} /></>); }
}
export default withRouter(ProjectDeleteContainer);

const ProjectDeleteComponent = (props) => {
  const doDelete = () => {
    //remove from backend and frontend
    //get project id, send in destroy method
    //in backend:
    //delete project, children (section titles, section title children)
    //in frontend:
    //simply delete the project from the store
    //then, redirect
    
    props.deleteProject(props.project, '/projects/' + props.project.id, 'DELETE', props.deleteProjectState, props.history)


    props.history.push('/projects');
    props.history.go();
  }

  return (<div>{doDelete()}</div>);
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  return {
    project: state.projects.find(x => x.id == id),
    projects: state.projects
  }
}

const ProjectDeleteComponentConnected = connect(mapStateToProps, {deleteProject, deleteProjectState})(ProjectDeleteComponent);
