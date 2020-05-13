import React from 'react';

const EditProjectLinksComponent = (props) => {
  return (
    <div>
      <div id='links'>

          <button onClick={props.functions.addSectionTitle}>Add Section Title</button>
          <button onClick={props.functions.showAddDataOptions}>Add Research</button>
          <button onClick={props.functions.addGraph}>Add Graph</button>

      </div>

      <div id='secondary-links' >

          <button onClick={props.functions.addSectionTitle}>Add Preliminary Data</button>
          <button onClick={props.functions.showAddDataOptions}>Add Research Data</button>
          <button onClick={props.functions.addGraph}>Add Random Data</button>
          <button onClick={props.functions.showPrimaryOptions}>Back</button>

      </div>
    </div>

  )
}

export default EditProjectLinksComponent;
