import React, { Component } from 'react';
import SignupComponent from '../components/SignupComponent'

class SignupContainer extends Component {
  // TODO: move to redux thunk - signin info needed on each page
  state = {
    email: "",
    password: "",
    password_confirmation: ""
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    // TODO: add dispatch
    //resets state
    this.setState({
      email: "",
      password: "",
      password_confirmation: ""
    })
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    //setState is asynchronous
    //console.log(this.state)
  }

  render(){
    return (
      <div>
        <SignupComponent handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} myState={this.state} />
      </div>
    )
  }
}

export default SignupContainer;
