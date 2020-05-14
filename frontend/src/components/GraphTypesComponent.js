import React from 'react';

const GraphTypesComponent = (props) => {
  return (
    <select onChange={e => props.onSelect(e)}>
      <option name="bar">Bar</option>
      <option name="scatter">Scatter</option>
    </select>
  )
}
export default GraphTypesComponent;
