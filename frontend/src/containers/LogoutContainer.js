import React, {Component} from 'react';
import LogoutComponent from '../components/LogoutComponent'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import logout from '../actions/SessionActions';
import resetUser from '../actions/UserActions';
import resetProjects from '../actions/ProjectActions';



class LogoutContainer extends Component {

  doLogout = (history) => {
    const {logout, resetUser, resetProjects } = this.props;
    logout(history, resetUser, resetProjects);
  }

  render(){return (<LogoutComponent doLogout={this.doLogout} />)}
}

export default connect(null, { logout, resetUser, resetProjects })(LogoutContainer);
