import React from 'react';
import Button from 'react-bootstrap/Button';

const EditProjectLinksComponent = (props) => {
  return (
    <div>
      <div id='primary-links'>
          <Button variant="primary" onClick={props.functions.addSectionTitle}>Add Section Title</Button>
          <Button variant="primary" onClick={props.functions.showAddDataOptions}>Add Research</Button>
          <Button variant="primary" onClick={props.functions.addGraph}>Add Graph</Button>
      </div>

      <div id='secondary-links' >
          <Button variant="primary" onClick={props.functions.addPreliminaryData}>Add Preliminary Data</Button>
          <Button variant="primary" onClick={props.functions.addResearchData}>Add Research Data</Button>
          <Button variant="primary" onClick={props.functions.addRandomData}>Add Random Data</Button>
          <Button variant="info" onClick={props.functions.showPrimaryOptions}>Back</Button>
      </div>
    </div>

  )
}

export default EditProjectLinksComponent;
