import React from 'react';
import ProjectContainer from './ProjectContainer';
import { connect } from 'react-redux';

class ProjectsContainer extends React.Component {
  projects = this.props.projects.map(project => {return <ProjectContainer key={project.id} project={project} />});
  render(){return(<div>
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
