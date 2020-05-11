import React, {Component} from 'react';
import ProfileEditComponent from '../components/ProfileEditComponent';
import { updateUser, updateUserState } from '../actions/UserActions';

import { connect } from 'react-redux';

class ProfileEditContainer extends Component {

  state = {
    current_email: this.props.user.email,
    current_password: '',
    email: '',
    password: '',
    password_confirmation: '',

  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onClick = (event, history) => {
    // callback is necessary to do async state update
    this.props.updateUser(this.state, history, this.props.updateUserState);
  }

  render(){
    return (
      <ProfileEditComponent user={this.state} onChange={this.onChange} onClick={this.onClick}/>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps,{ updateUser, updateUserState })(ProfileEditContainer);
