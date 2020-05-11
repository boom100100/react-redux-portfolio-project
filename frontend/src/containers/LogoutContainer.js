import React, {Component} from 'react';
import LogoutComponent from '../components/LogoutComponent'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from '../actions/SessionActions';
import * as rootActions from '../actions/RootActions';

class LogoutContainer extends Component {

  doLogout = (history) => {
    const logoutInitiator = this.props.SessionActions.logout;
    const { logout } = this.props.RootActions;
    // const { resetProjects } = this.props.actions3;
    logoutInitiator(history, logout);
  }

  render(){return (<LogoutComponent doLogout={this.doLogout} />)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    // bind is necessary to allow async action w/o error
    //otherwise, refactor
    SessionActions: bindActionCreators(sessionActions, dispatch),
    RootActions: bindActionCreators(rootActions, dispatch),

  };
};

export default connect(null, mapDispatchToProps)(LogoutContainer);
