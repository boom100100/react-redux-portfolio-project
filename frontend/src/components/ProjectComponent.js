import React from 'react';

const ProjectComponent = (props) => {
  return (
    <div id='project-container-parent'>
      <div>Loading...</div>
      <div id='project-container-name'></div>
      <div id='project-container-abstract'></div>
      <div id='links'>
        <div><a href={props.pathname + '/read'}>Read</a></div>
        <div><a href={props.pathname + '/edit'}>Edit</a></div>
        <div><a href={props.pathname + '/delete'}>Delete</a></div>
      </div>
    </div>
  )
}

export default ProjectComponent;
