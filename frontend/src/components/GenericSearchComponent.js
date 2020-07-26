import React from 'react';
import Button from 'react-bootstrap/Button';

const GenericSearchComponent = (props) => {
  const CustomTag = `${props.type}`;
  return (
    <div>
      {props.text}<CustomTag name='searchTerm' value={props.inputFields.searchTerm} onChange={e => props.onChange(e)} />

      <Button variant="primary" onClick={props.click}>Search</Button>
      <p>{(props.inputFields.holdText || undefined)}</p>
    </div>
  )
}

export default GenericSearchComponent;
