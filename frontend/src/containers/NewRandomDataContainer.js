import React from 'react';
import { getRandomData } from '../actions/DataResearchActions';
import { addDataToProject, addToBackend, deleteData, deleteDataState } from '../actions/ProjectActions';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import NewDataButtonComponent from '../components/NewDataButtonComponent';
import { connect } from 'react-redux';

class NewRandomDataContainer extends React.Component {

  componentDidMount(){
    // console.log('this.props.data', this.props.data);
    if (!this.props.data){//this.props.data{
      this.getNewData();
    } else {
      this.updatefetchData();
    }
}

  getNewData = () => {
    this.props.getRandomData(this.updatefetchData);
  }

  saveToProject = () => {
    let fields = this.state.inputFields;
    const id = fields.section_title_child_id;

    // collect data to save in object
    const randomData = {
      section_title_child_id: id,
      section_title_id: fields.section_title_id,
      name: fields.name,
      project_id: this.props.project.id,

      section_order: fields.section_order,
      child_order: fields.child_order,
      description:  fields.description,
      content: fields.content,
      type: 'RandomDatum',
      url: fields.url
    }

    //dispatch action to add data to project
    // (randomData);

    //fetch post to db
    this.props.addToBackend(randomData, '/section_title_children/' + (id || ""), this.props.saveMethod, this.props.addDataToProject);
  }


  updatefetchData = (json) => {
    if (json){
      this.setState({
        fetchData: {
          ...json,
        },
        inputFields: {
          ...this.state.inputFields,
          url: json.source_url,
          content: json.text,
        }
      }, () => {
        this.updateDivs();
      });
    } else {this.updateDivs();}
  }

  updateDivs = () => {
    let fetchDivName = this.state.inputFields.names.divIdFetch;
    document.getElementById(fetchDivName).innerText = '';
    this.doDivUpdate(fetchDivName, fetchDivName + '-text', this.state.inputFields.content);
    this.doDivUpdate(fetchDivName, fetchDivName + '-url', this.state.inputFields.url);
  }

  doDivUpdate = (divId, childDivId, innerText) => {
    let parent = document.getElementById(divId);

    let child = (document.getElementById(childDivId) || document.createElement('div'));
    child.id = childDivId;
    child.innerText = innerText;

    parent.appendChild(child);
    // return (<MyFetchData data={} />)
  }

  onChange = (e) => {
    this.setState({
      fetchData: {...this.state.fetchData},
      inputFields: {
        //names: {...this.state.inputFields.names},
        ...this.state.inputFields,
        [e.target.name]: e.target.value
      }
    });
  }

  onChangeNumber = (e, newFocus, newOptions, sectionOrder) => {
    this.setState({
      ...this.state,
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: Number(e.target.value),
      }
    }, () => {


      if (newOptions)
        newOptions(sectionOrder);

      if (window.newFocus)
        window.newFocus();

    });
  }

  divId = (base) => {
    if (this.props.data){
      let { data } = this.props;
      return base + '-' + data.section_title_id + '-' + data.child_order;
    }
    return base
  }

  getSavedData = (variableName, emptyValue) => {
    if (this.props.data)
      return this.props.data[variableName];
    return emptyValue;
  }



  deleteData = () => {
    console.log('clicked delete');
    const fields = this.state.inputFields;
    // fields.section_title_child_id
    // fields.section_title_id
    // console.log('fields', fields);
    // console.log('this.props.project.section_titles', this.props.project.section_titles);
    const sectionIndex = this.props.project.section_titles.findIndex(e => e.id === fields.section_title_id)
    const childIndex = this.props.project.section_titles[sectionIndex].section_title_children.findIndex(e => e.id === fields.section_title_child_id)
    const child = this.props.project.section_titles[sectionIndex].section_title_children[childIndex];
    // console.log('child', child);
    this.props.deleteData(child, `/section_title_children/${child.id}`, 'DELETE', this.props.deleteDataState);
  }
  state = {
    fetchData: {
      id:"",
      text: "",
      source:"",
      source_url:"",
      language:"",
      permalink: ""
    },
    inputFields: {
      names: {
        divIdFetch: this.divId('random-data-fetch-json'),
        divIdInput: this.divId('random-data-input-fields')
      },
      name: this.getSavedData('name', ''),
      url: this.getSavedData('url', ''),
      description:  this.getSavedData('description', ''),
      content: this.getSavedData('content', ''),
      section_order: this.getSavedData('section_order', 0),
      child_order: this.getSavedData('child_order', 0),
      section_title_id: this.getSavedData('section_title_id', 0),
      section_title_child_id: this.getSavedData('id', undefined),
    }
  }

  render(){
    return (
      <div id={this.props.id}>

        <NewDataFetchJsonComponent type='div' fetchData={this.state.fetchData} inputFields={this.state.inputFields} />
        <NewDataInputFieldsComponent childOrderId='random-data-section-child-order' isSectionTitle={false} section_titles={this.props.project.section_titles} inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} onChangeNumber={this.onChangeNumber} deleteData={this.props.data ? this.deleteData : undefined} />
        {this.props.data ? undefined : <NewDataButtonComponent click={this.getNewData} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id)
  return {
    project: state.projects[index],
    projects: state.projects
  }
}

export default connect(mapStateToProps, { getRandomData, addDataToProject, addToBackend, deleteData, deleteDataState })(NewRandomDataContainer);
