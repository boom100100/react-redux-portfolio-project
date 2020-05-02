import React from 'react';

const LoginComponent = (props) => {
  
  return (
    <form onSubmit={props.handleOnSubmit} /*action="http://localhost:3001/sessions" method="POST"*/>
      <input type="text" name="email" onChange={props.handleOnChange} value={props.myState.email} />
      <input type="password" name="password" onChange={props.handleOnChange} value={props.myState.password} />
      <input type="password" name="password_confirmation" onChange={props.handleOnChange} value={props.myState.password_confirmation} />
      <input type="submit" value="Log In" />
    </form>
  )
}

export default LoginComponent;
