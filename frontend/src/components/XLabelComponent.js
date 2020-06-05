import React from 'react';

const XLabelComponent = (props) => {
  return (
    <>
      <input type='text' name={'x-label-input-' + props.name} value={props.value} onChange={e => props.onChange(e)} />
      <button name={'x-label-button-' + props.name} onClick={e => props.onClick(e, props.name)} >Delete Label</button>
    </>
  )
}

export default XLabelComponent;
