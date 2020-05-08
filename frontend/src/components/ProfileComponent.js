import React from 'react';

const ProfileComponent = (props) => {
  return (
    <div>
      <h3>Profile</h3>
      <p>{props.user.email}</p>

    </div>
  )
}

export default ProfileComponent;
