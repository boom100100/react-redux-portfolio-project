import React, {Component} from 'react';
import { connect } from 'react-redux';

class ProjectReadContainer extends Component {
  showData = () => {
    components = []
    //for each section title
      // return formatted section title, add to array
      // return formatted children, add to array
    // return array
  }
  formatSectionTitle = () => {}
  formatGraph = () => {}
  formatResearch = () => {}
  render(){
    return (
      <div>
        <div>ProjectReadContainer</div>
        <h1>{this.props.project.name}</h1>
        <h2>Abstract</h2>
        <h2>Content</h2>
        {this.showData()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id);

  return {
    project: state.projects[index]
  }
}

export default connect(mapStateToProps)(ProjectReadContainer);
