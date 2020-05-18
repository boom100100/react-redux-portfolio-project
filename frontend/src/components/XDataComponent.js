import React from 'react';

const XDataComponent = (props) => {
  return (
    <>
      <input type='text' name={'x-data-input-' + props.xIndex + '-' + props.setIndex} value={props.value} onChange={(e) => props.onChange(e)} />
      <button onClick={props.removeData} name={'x-data-button-' + props.xIndex + '-' + props.setIndex}>Delete Data</button>
    </>
  )
}

export default XDataComponent;
