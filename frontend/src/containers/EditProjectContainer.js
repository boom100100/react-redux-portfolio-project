import React from 'react';
import EditProjectComponent from '../components/EditProjectComponent';
import * as editHelpers from './helpers/EditProjectHelpers'
import { connect } from 'react-redux';

//structure:
//show project info at top
//show old data in order under project info
//needs reorder functionality
//and edit buttons
//show options to add new data under old data
//will unhide new data builders

class EditProjectContainer extends React.Component {
  componentDidMount(){
    const { match: { params } } = this.props;
    const { projects } = this.props;

    this.setState({
      functions: {...this.state.functions, setState: this.setState},
      project: projects.find(project => project.id == params.project_id)
    }, () => {
      this.state.functions.modifyElements(this.state.project);
      this.state.functions.showPrimaryOptions();
    });
  }

  onProjectObjectChange = (e) => {
    this.setState({
      functions: {...this.state.functions},
      project: {
        ...this.state.project,
        [e.target.name]: e.target.value
      }
    });
  }

  state = {
    project: {
      abstract: '',
      name: ''
    },
    functions: {
      ...editHelpers,
      onProjectObjectChange: this.onProjectObjectChange,
    }
  }

  render(){

    return (

      <div>
        <EditProjectComponent state={this.state} functions={this.state.functions} />
        {document.getElementById('edit-project-parent') != null ? this.state.functions.modifyElements(this.state.project) : undefined}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  }
}

export default connect(mapStateToProps)(EditProjectContainer);
