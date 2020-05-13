import React from 'react';
import NewProjectLink from '../components/NewProjectLink';
import { connect } from 'react-redux';

class ProjectsContainer extends React.Component {
  projects = this.props.projects.map(project => {return <div key={project.id}><a href={"/projects/" + project.id}>{project.name}</a></div> });
  render(){return(<div>
    <NewProjectLink />
    {this.projects}
    </div>)}
}

const mapStateToProps = (state) => {
  // console.log('full state',state);
  return {
    projects: state.projects,
  }
}

export default connect(mapStateToProps)(ProjectsContainer);
