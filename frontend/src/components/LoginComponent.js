import React from 'react';

const LoginComponent = (props) => {

  return (
    <form onSubmit={props.handleOnSubmit} /*action="http://localhost:3001/sessions" method="POST"*/>

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

export default LoginComponent;
