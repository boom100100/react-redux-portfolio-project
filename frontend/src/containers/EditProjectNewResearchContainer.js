import React, { Component } from 'react';
import EditProjectNewResearchComponent from '../components/EditProjectNewResearchComponent';

class EditProjectNewResearchContainer extends Component {
  render(){
    return (
      <div id={this.props.id}>
        <EditProjectNewResearchComponent parentId={this.props.parentId} randomId={this.props.randomId} preliminaryId={this.props.preliminaryId} researchId={this.props.researchId} />
      </div>
    )
  }
}

export default EditProjectNewResearchContainer;
