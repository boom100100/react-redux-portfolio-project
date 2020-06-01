import React from 'react';
import { getRandomData } from '../actions/DataResearchActions';
import { addDataToProject, addToBackend } from '../actions/ProjectActions';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import NewDataButtonComponent from '../components/NewDataButtonComponent';
import { connect } from 'react-redux';

class NewRandomDataContainer extends React.Component {

  componentDidMount(){
    this.getNewData();
  }

  getNewData = () => {
    this.props.getRandomData(this.updatefetchData);
  }

  saveToProject = () => {
    console.log('clicked saveToProject');
    console.log('state', this.state);

    let fields = this.state.inputFields;
    console.log('fields', fields);
    // collect data to save in object
    const randomData = {
      name: fields.name,
      project_id: this.props.project.id,
      section_order: fields.section_order,
      child_order: fields.child_order,
      description:  fields.description,
      content: fields.content,
      type: 'RandomDatum',
      url: fields.url
    }
    console.log('randomData', randomData);

    //dispatch action to add data to project
    this.props.addDataToProject(randomData);

    //fetch post to db
    this.props.addToBackend(randomData, '/section_title_children', 'POST');
  }


  updatefetchData = (json) => {
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
  }

  updateDivs = () => {
    document.getElementById('random-data-fetch-json').innerText = '';
    this.doDivUpdate('random-data-fetch-json', 'random-data-fetch-json-text', this.state.fetchData.text);
    this.doDivUpdate('random-data-fetch-json', 'random-data-fetch-json-url', this.state.fetchData.source_url);
  }

  doDivUpdate = (divId, childDivId, innerText) => {
    let parent = document.getElementById(divId);

    let child = (document.getElementById(childDivId) || document.createElement('div'));
    child.id = childDivId;
    child.innerText = innerText;

    parent.appendChild(child);
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
      console.log('new state',this.state);
      console.log('newFocus', newFocus);

      if (newOptions)
        newOptions(sectionOrder);

      if (window.newFocus)
        window.newFocus();

    });
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
        divIdFetch: 'random-data-fetch-json',
        divIdInput: 'random-data-input-fields'
      },
      name: "",
      url: "",
      description:  "",
      content: "",
      section_order: 0,
      child_order: 0,
    }
  }

  render(){
    return (
      <div id='add-new-random-data'>

        <NewDataFetchJsonComponent type='div' fetchData={this.state.fetchData} inputFields={this.state.inputFields} />
        <NewDataInputFieldsComponent childOrderId='random-data-section-child-order' isSectionTitle={false} section_titles={this.props.project.section_titles} inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />

        <NewDataButtonComponent click={this.getNewData} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  return {
    project: state.projects[id-1],
    projects: state.projects
  }
}

export default connect(mapStateToProps, { getRandomData, addDataToProject, addToBackend })(NewRandomDataContainer);
