import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

const LoginComponent = (props) => {

  const { history } = props;

  return (
    <form onSubmit={e => props.handleOnSubmit(e, history)} /*action="http://localhost:3001/sessions" method="POST"*/>

      <input type="hidden" name="csrf-token" content={props.token} value={props.token} />

      <h3>Log In</h3>

      <label>Email Address:<br />
        <input type="text" name="email" onChange={props.handleOnChange} value={props.email} /><br /><br />
      </label>

      <label>Password:<br />
        <input type="password" name="password" onChange={props.handleOnChange} value={props.password} /><br /><br />
      </label>

      <input type="submit" value="Log In" /><br /><br />
    </form>
  )
}

var propTypes = {
    history: PropTypes.object.isRequired
  };

export default withRouter(LoginComponent);
