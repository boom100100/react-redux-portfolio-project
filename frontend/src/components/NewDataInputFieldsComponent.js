import React from 'react';
import SaveDataButtonComponent from './SaveDataButtonComponent';

const NewDataInputFieldsComponent = (props) => {
  //workaround:
  //need unique keys
  //but key values come back undefined
  let keyCounter = 0;

  // when user chooses section
  //select options repopulate
  // to represent data in that section
  const makeDataOrderOptions = (index) => {
    let indexCleaner = (index || 0);

    // let titles = props.section_titles[indexCleaner];
    let children;
    if (props.section_titles[indexCleaner])
      children = props.section_titles[indexCleaner].section_title_children;

    // console.log('titles', titles);
    // console.log('children', children);
    return (
      <select onChange={e => props.onChangeNumber(e)} onFocus={e => props.onChangeNumber(e)} value={props.inputFields.child_order} name='child_order' id={'graph-section-child-order'}>
        {children ? children.map(x => {
          keyCounter++;
          return (<option key={'keyCounter=' + keyCounter + '-child_order=' + x.child_order + '-section_order=' + x.section_order + '-project_id=' + x.project_id + '-name=' + x.name} value={x.child_order}>{x.name}</option>);
        }) : undefined}
        <option value={children ? children.length : 0}>(place last)</option>
      </select>
    )
  }

  const doChange = (e) => {
    props.onChangeNumber(e);//, document.getElementById(props.childOrderId).focus, makeDataOrderOptions, props.inputFields.section_order);
  }

  const dataOrderer = () => {
    return (
      <span>
        Place in section:
        <select onChange={e => props.onChangeNumber(e)} onFocus={e => props.onChangeNumber(e)} value={props.inputFields.section_order} name='section_order'>
          {props.section_titles.map(x => <option key={'section_order=' + x.section_order + '-project_id=' + x.project_id + '-name=' + x.name} value={x.section_order}>{x.name}</option>)}
        </select>
        Place before data:
        {makeDataOrderOptions(props.inputFields.section_order)}
      </span>
    );
  }



  const sectionTitleOrderer = () => {
    return (
      <span>
        Place before section:
        <select onChange={e => props.onChangeNumber(e)} onFocus={e => props.onChangeNumber(e)} value={props.inputFields.section_order} name='section_order'>
          {props.section_titles.map(x => <option key={'section_order=' + x.section_order + '-name=' + x.name} value={x.section_order}>{x.name}</option>)}
          <option value={props.section_titles.length}>(place last)</option>
        </select>
      </span>
    );
  }

  //order
  //returns inputs for ordering new section titles children
  const letSetOrder = () => {
    if (props.isSectionTitle){
      return sectionTitleOrderer();
    } else {
      return dataOrderer();
    }
  }

  return (
    <div id={props.inputFields.names.divIdInput}>
      <label>
        <div>Name</div>
        <input name='name' value={props.inputFields.name} onChange={e => props.onChange(e)} />
      </label>
      <label>
        <div>Description</div>
        <textarea name='description' value={props.inputFields.description} onChange={e => props.onChange(e)}></textarea>
      </label><br />
      {letSetOrder()}
      <SaveDataButtonComponent click={props.click} />
    </div>
  )
}

export default NewDataInputFieldsComponent;
