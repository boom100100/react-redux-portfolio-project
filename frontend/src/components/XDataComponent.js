import React from 'react';

const XDataComponent = (props) => {
  return (
    <>
      <input type='text' name={'x-data-input-' + props.name + '-' + props.xIndex + '-' + props.setIndex} value={props.value} onChange={e => props.onChange(e)} />
      <button onClick={e => props.removeData(e, props.name)} name={'x-data-button-' + props.name + '-' + props.xIndex + '-' + props.setIndex}>Delete Data</button>
    </>
  )
}

export default XDataComponent;
