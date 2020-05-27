import React from 'react';

const GenericSearchComponent = (props) => {
  const CustomTag = `${props.type}`;
  return (
    <div>
      {props.text}<CustomTag name='searchTerm' value={props.inputFields.searchTerm} onChange={e => props.onChange(e)} />

      <button onClick={props.click}>Search</button>
      <p>{(props.inputFields.holdText || undefined)}</p>
    </div>
  )
}

export default GenericSearchComponent;
