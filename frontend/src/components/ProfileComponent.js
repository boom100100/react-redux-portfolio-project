import React from 'react';

const ProfileComponent = (props) => {
  return (
    <div>
      <h3>Profile</h3>
      <p>{props.user.email}</p>
      <a href="/profile/edit">Edit</a>
      <a href="/profile/delete">Delete</a>
    </div>
  )
}

export default ProfileComponent;
