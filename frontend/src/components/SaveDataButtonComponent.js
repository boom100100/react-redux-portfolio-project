import React from 'react';
import Button from 'react-bootstrap/Button';

const SaveDataButtonComponent = (props) => {
  return(
    <>
      <Button variant="primary" onClick={e => props.click(e)}>Save Data</Button>
      {props.deleteData ? <Button variant="danger" onClick={e => props.deleteData(e)}>Delete Data</Button> : undefined}
    </>)
}
export default SaveDataButtonComponent;
