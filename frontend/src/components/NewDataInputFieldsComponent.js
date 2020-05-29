import React from 'react';
import SaveDataButtonComponent from './SaveDataButtonComponent';

const NewDataInputFieldsComponent = (props) => {
  //workaround:
  //need unique keys
  //but key values come back undefined
  let keyCounter = 0;

  //flow
  // when user chooses section
  //select for data repopulates
  // to represent that section

  const makeDataOrderOptions = (index) => {
    let indexCleaner = (index || 0);

    let titles = props.section_titles[indexCleaner];
    let children = props.section_titles[indexCleaner].section_title_children;

    console.log('titles', titles);
    console.log('children', children);
    return (
      <select onChange={e => props.onChangeNumber(e)} onFocus={e => props.onChangeNumber(e)} value={props.inputFields.child_order} name='child_order' id='child-order'>
        {children.map(x => {
          keyCounter++;
          return (<option key={'keyCounter=' + keyCounter + '-child_order=' + x.child_order + '-project_id=' + x.project_id + '-name=' + x.name} value={x.child_order}>{x.name}</option>);
        })}
        <option value={children.length}>(place last)</option>
      </select>
    )
  }

  const removeOptions = () => {
    console.log('doing removeOptions');
    // document.getElementById('child-order').innerHTML = "";
    // let child = document.getElementById('child-order');
    // child.parentElement.removeChild(child);

    let options = document.getElementById('child-order').options;
    document.querySelector('#child-order').innerHTML = '';

    // options.map(o => o.remove());
    // while (options.length > 0) {
    //   options.remove(options.length - 1);
    // }
  }

  const doChange = (e) => {
    removeOptions();
    props.onChangeNumber(e);
    makeDataOrderOptions(props.inputFields.section_order);
  }

  const dataOrderer = () => {
    return (
      <span>
        Place in section:
        <select onChange={e => doChange(e)} onFocus={e => doChange(e)} value={props.inputFields.section_order} name='section_order'>
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
