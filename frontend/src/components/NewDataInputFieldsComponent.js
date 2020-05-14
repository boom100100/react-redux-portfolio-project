import React from 'react';
import SaveDataButtonComponent from './SaveDataButtonComponent';

const NewDataInputFieldsComponent = (props) => {
  // const titles = props.state.project.section_titles.map(title => <SectionTitleComponent title={title} />)
  return (

    <div id={props.inputFields.names.divIdInput}>
      <label>
      <div>Name</div>
      <input name='name' value={props.inputFields.name} onChange={props.onChange} />
      </label>
      <label>
      <div>Description</div>
      <textarea name='description' value={props.inputFields.description} onChange={props.onChange}></textarea>
      </label><br />

      <SaveDataButtonComponent click={props.click} />
    </div>

  )
}

export default NewDataInputFieldsComponent;
