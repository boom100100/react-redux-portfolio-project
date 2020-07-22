import React from 'react';
const SaveDataButtonComponent = (props) => {
  return(
    <>
      <button onClick={e => props.click(e)}>Save Data</button>
      {props.deleteData ? <button onClick={e => props.deleteData(e)}>Delete Data</button> : undefined}
    </>)
}
export default SaveDataButtonComponent;
