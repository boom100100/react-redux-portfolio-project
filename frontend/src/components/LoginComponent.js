import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

const LoginComponent = (props) => {

  const { history } = props;

  return (
    <>
      <h3>Log In</h3>

      <label>Email Address:<br />
        <input type="text" name="email" onChange={props.handleOnChange} value={props.email} /><br /><br />
      </label>

      <label>Password:<br />
        <input type="password" name="password" onChange={props.handleOnChange} value={props.password} /><br /><br />
      </label>

      <button onClick={e => props.handleOnSubmit(e, history)}>Log In</button><br /><br />
    </>
  )
}

var propTypes = {
    history: PropTypes.object.isRequired
  };

export default withRouter(LoginComponent);
