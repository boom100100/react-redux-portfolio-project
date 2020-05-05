import React, { Component } from 'react';
import SignupComponent from '../components/SignupComponent'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/UserActions';

class SignupContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    }
  }

  onSubmit = (event, history) => {
    event.preventDefault();
    // TODO: add dispatch
    const createUser = this.props.actions.createUser;
    createUser(this.state, history);
    //resets state
    this.setState({
      email: "",
      password: "",
      password_confirmation: ""
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    //setState is asynchronous
    //console.log(this.state)
  }

  render(){
    return (
      <div>
        <SignupComponent handleOnChange={this.onChange} handleOnSubmit={this.onSubmit} myState={this.state} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SignupContainer);
