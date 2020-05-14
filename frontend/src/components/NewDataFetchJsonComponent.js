import React from 'react';


const NewDataFetchJsonComponent = (props) => {
  // const titles = props.state.project.section_titles.map(title => <SectionTitleComponent title={title} />)
  return (
    <div id={props.inputFields.names.divIdFetch}>{(props.inputFields.holdText || undefined)}</div>
  )
}

export default NewDataFetchJsonComponent;
