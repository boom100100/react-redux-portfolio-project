import React from 'react';
import ProjectComponent from '../components/ProjectComponent'
import { connect } from 'react-redux';

class ProjectContainer extends React.Component {

  state = {
    project: undefined,
    pathname: window.location.pathname
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { projects } = this.props;

    this.setState({
      project: projects.find(project => project.id == params.project_id)
    }, () => {
      const { project } = this.state;

      let parent = document.getElementById('project-container-parent');
      parent.removeChild(parent.firstElementChild);

      let name = document.getElementById('project-container-name');
      name.innerText = project.name;

      let abstract = document.getElementById('project-container-abstract');
      abstract.innerText = project.abstract;

      // const { project } = this.state;
      console.log('project', project);
    });
  }

  render(){
    return (
      <ProjectComponent pathname={this.state.pathname} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  }
}

export default connect(mapStateToProps)(ProjectContainer);
