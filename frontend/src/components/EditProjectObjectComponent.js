import React from 'react';
import { updateProject, updateProjectState } from '../actions/ProjectActions'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

class EditProjectObjectComponent extends React.Component {

  getValue = (valueName) => {
    if (this.props.project)
      return this.props.project[valueName];

    return '';
  }
  state = {
    name: this.getValue('name') || '',
    abstract: this.getValue('abstract') || '',
    user_email: this.props.user.email
  }
  saveProject = (e) => {
    //change backend
    //change store to frontend
    // console.log('clicked saveProject');

    const project = {
      ...this.props.project,
      ...this.state
    }

    let object, url, method;

    if (project.id){
      object = project;
      url = '/projects/' + project.id;
      method = 'PUT';
    } else {
      object = this.state;
      url = '/projects';
      method = 'POST';
    }

    this.props.updateProject(object, url, method, this.props.updateProjectState, this.props.callbackType, (this.props.rerouteCallback || undefined));
  }

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render(){
    return (
      <>
        <div>
          <p>Name:</p>
          <input type='text' name='name' value={this.state.name} onChange={e => this.onChange(e)} />
        </div>
        <div>
          <p>Abstract:</p>
          <textarea name='abstract' value={this.state.abstract} onChange={e => this.onChange(e)} ></textarea>
        </div>
        <Button variant="primary" onClick={e => this.saveProject(e)}>Save</Button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id);

  return {
    project: state.projects[index],
    user: state.user
  }
}

export default connect(mapStateToProps, { updateProject, updateProjectState })(EditProjectObjectComponent);
