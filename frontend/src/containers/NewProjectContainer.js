import React, {Component} from 'react';
import EditProjectObjectComponent from '../components/EditProjectObjectComponent'
import { withRouter } from 'react-router-dom';

class NewProjectContainer extends Component {
  rerouteCallback = () => {
    this.props.history.push('/projects');
  }

  render (){
    return (<EditProjectObjectComponent rerouteCallback={this.rerouteCallback} callbackType={'CREATE_PROJECT'} />)
  }
}

export default withRouter(NewProjectContainer);
