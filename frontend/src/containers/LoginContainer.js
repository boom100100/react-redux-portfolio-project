import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from  '../actions/login';

import LoginComponent from '../components/LoginComponent'

class LoginContainer extends Component {
  constructor(props){
    super(props);

    // TODO: move to redux thunk - signin info needed on each page
    this.state = {
      email: "",
      password: ""
    }
  }



  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.login(this.state);
    this.setState({email: "", password: ""});
    //add dispatch
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
        <LoginComponent handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} myState={this.state} />
        {// TODO: remove button

        }<button onClick={this.handleOnClick}>Click</button>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () => dispatch({ type: 'INCREASE_COUNT' }),
    login: (state) => dispatch(login(state)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

// export default LoginContainer;
