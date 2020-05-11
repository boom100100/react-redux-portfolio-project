import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class ProfileDeleteComponent extends Component {

  componentDidMount(){
    this.props.getHistory(this.props.history);
  }

  render(){ return (<div>A</div>) }
}

export default withRouter(ProfileDeleteComponent);
