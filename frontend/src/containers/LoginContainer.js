import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { login } from '../actions/SessionActions';
import { addUser } from '../actions/UserActions';
import { addProjects } from '../actions/ProjectActions';

import LoginComponent from '../components/LoginComponent';

import { NavLink } from 'react-router-dom'

class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: ''
    };
  }

  onClick = (e, history) => {
    this.props.login(this.state, history, this.props.addUser, this.props.addProjects);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div>
          <LoginComponent token={this.state.token} handleOnChange={this.onChange} handleOnSubmit={this.onClick} state={this.state} />
        </div>
        <div>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }
}

export default connect(null, { login, addUser, addProjects })(LoginContainer);
