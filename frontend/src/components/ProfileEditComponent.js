import React from 'react';
import { withRouter } from 'react-router-dom';

const ProfileEditComponent = (props) => {
  const { history } = props;
  return (
    <div>
      <h3>Edit Profile</h3>

      <div>
        <div>
          Email:
        </div> <input type='text' value={props.user.email} name='email' onChange={e => props.onChange(e)} />
      </div>

      <div>
        <div>
          Current Password:
        </div>
        <input type='password' value={props.user.current_password} name='current_password' onChange={e => props.onChange(e)} />
      </div>

      <div>
        <div>
          New Password:
        </div>
        <input type='password' value={props.user.password} name='password' onChange={e => props.onChange(e)} />
      </div>

      <div>
        <div>
          New Password Confirmation:
        </div>
        <input type='password' value={props.user.password_confirmation} name='password_confirmation' onChange={e => props.onChange(e)} />
      </div>



      <button onClick={e => props.onClick(e, history)}>Edit</button>


    </div>
  )
}

export default withRouter(ProfileEditComponent);
