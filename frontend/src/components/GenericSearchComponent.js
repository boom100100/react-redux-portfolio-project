import React from 'react';

const GenericSearchComponent = (props) => {
  return (
    <div>
      Search term: <input name='searchTerm' value={props.searchTerm} onChange={e => props.onChange(e)} />
      <button onClick={props.click}>Search</button>
    </div>
  )
}

export default GenericSearchComponent;
