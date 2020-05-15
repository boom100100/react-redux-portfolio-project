import React from 'react';

const XLabelComponent = (props) => {
  return (
    <>
      <input type='text' name={props.name} value={props.value} onChange={e => props.onChange(e)} />
      <button name={props.name} onClick={props.onClick} >Delete Label</button>
    </>
  )
}

export default XLabelComponent;
