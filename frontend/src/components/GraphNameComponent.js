import React from 'react';

const GraphNameComponent = (props) => {
  return (
    <div>Graph name:<input value={props.gName} onChange={e => props.onChange(e)} /></div>
  )
}
export default GraphNameComponent;
