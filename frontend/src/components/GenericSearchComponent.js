import React from 'react';

const GenericSearchComponent = (props) => {
  return (
    <div>
      {props.text}<input name='searchTerm' value={props.inputFields.searchTerm} onChange={e => props.onChange(e)} />
      <button onClick={props.click}>Search</button>
      <p>{(props.inputFields.holdText || undefined)}</p>
    </div>
  )
}

export default GenericSearchComponent;
