import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class ProfileDeleteComponent extends Component {
  componentDidMount(){
    //sends history to container
    const { history } = this.props;
    this.props.getHistory(history);
  }

  render(){
    return (
      <div>Deleting user.</div>
    )
}
}

export default withRouter(ProfileDeleteComponent);
