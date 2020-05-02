import React, { Component } from 'react';
import LoginComponent from '../components/LoginComponent'

class LoginContainer extends Component {
  // TODO: move to redux thunk - signin info needed on each page
  state = {
    email: "",
    password: "",
    password_confirmation: ""
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    //add dispatch
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    //setState is asynchronous
    console.log(this.state)
  }

  render(){
    return (
      <div>
        <LoginComponent handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} myState={this.state} />
      </div>
    )
  }
}

export default LoginContainer;
