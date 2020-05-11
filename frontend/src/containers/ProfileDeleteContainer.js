import React, {Component} from 'react';
import ProfileDeleteComponent from '../components/ProfileDeleteComponent';
import { connect } from 'react-redux';
import { deleteUser, resetUser } from '../actions/UserActions';
import { logout } from '../actions/SessionActions';

class ProfileDeleteContainer extends Component {
  state = {
    history: null
  }
  changeState = (history) => {
    this.setState({history: history},() => {
      const {deleteUser, resetUser, logout } = this.props;
      deleteUser(this.props.user, this.state.history, logout, resetUser);
    });
  }

  render(){return (<ProfileDeleteComponent getHistory={this.changeState}/>)}
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps, { deleteUser, resetUser, logout })(ProfileDeleteContainer);
