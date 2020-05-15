import React from 'react';

const GraphTypesComponent = (props) => {
  return (
    <select name='select' onChange={e => props.onSelect(e)} value={props.select}>
      <option name="bar" value="bar">Bar</option>
      <option name="scatter" value="scatter">Scatter</option>
    </select>
  )
}
export default GraphTypesComponent;
