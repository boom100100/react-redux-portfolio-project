import React, {Component} from 'react';
import LogoutComponent from '../components/LogoutComponent'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from '../actions/SessionActions';
import * as userActions from '../actions/UserActions';



class LogoutContainer extends Component {



  logout = this.props.actions.logout;
  resetUser = this.props.actions2.resetUser;
  doLogout = (history) => {
    this.logout(history);
    this.resetUser();
  }

  render(){return (<LogoutComponent doLogout={this.doLogout} />)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
    actions2: bindActionCreators(userActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(LogoutContainer);
