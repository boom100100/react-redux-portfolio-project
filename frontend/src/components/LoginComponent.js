import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
//import LoginForm from '../components/LoginForm';

const LoginComponent = (props) => {

  const { history } = props;

  return (
    <form onSubmit={e => props.handleOnSubmit(e, history)} /*action="http://localhost:3001/sessions" method="POST"*/>

      <input type="hidden" name="csrf-token" content={props.token} value={props.token} />

      <div>
        <input type="text" name="email" onChange={props.handleOnChange} value={props.email} />
      </div>

      <div>
        <input type="password" name="password" onChange={props.handleOnChange} value={props.password} />
      </div>

      <div>
        <input type="submit" value="Log In" />
      </div>

    </form>
  )
}

var propTypes = {
    history: PropTypes.object.isRequired
  };

export default withRouter(LoginComponent);
