import React from 'react';

const EditProjectObjectComponent = (props) => {
  return (
    <>
      <div>
        <p>Name:</p>
        <input type='text' name='name' value={props.state.project.name} onChange={e => props.state.functions.onProjectObjectChange(e)} />
      </div>
      <div>
        <p>Abstract:</p>
        <textarea name='abstract' value={props.state.project.abstract} onChange={e => props.state.functions.onProjectObjectChange(e)} ></textarea>
      </div>
    </>
  )
}

export default EditProjectObjectComponent;
