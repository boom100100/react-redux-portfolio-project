import React from 'react';

class ProjectContainer extends React.Component {
  project = this.props.project;
  render(){
    return(
      <>
      <h3><a href="/projects">{this.project.name}</a></h3>
      </>
    )
  }
}

export default ProjectContainer;
