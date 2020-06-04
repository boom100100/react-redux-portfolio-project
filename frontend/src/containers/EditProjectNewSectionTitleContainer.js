import React, { Component } from 'react';
import GenericSearchComponent from '../components/GenericSearchComponent';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import { getSectionTitleData } from '../actions/SectionTitleActions';
import { addSectionToProject, addToBackend } from '../actions/ProjectActions';
import { connect } from 'react-redux';

class EditProjectNewSectionTitleContainer extends Component {
  componentDidMount(){
    document.getElementsByName('section-title-fetch-json')[0].style.display = 'none';
  }
  getNewData = () => {
    const searchTerm = this.state.inputFields.searchTerm.replace(/ /gi,'%20');
    this.props.getSectionTitleData(this.updatefetchData, searchTerm);
  }

  updatefetchData = (json) => {
    if ('topics' in json.response) {
    const results = this.getResults(json);
    this.setState({
      fetchData: [...results],
      inputFields: {
        ...this.state.inputFields,
        names: {...this.state.inputFields.names},
        holdText: "The results below show related topics. Build a fitting section title from them in the name text box. Adding a description is optional, but definitely press Save Data when you're done.",
        name: "",
        description:  "",
        url: "",
        content: results.join('\n'),
      }
    }, () => {
      document.getElementsByName('section-title-fetch-json')[0].style.display = 'block';
      console.log(this.state);
    });
    }
  }

  getResults = (json) => {
    if ('topics' in json.response)
      return json.response.topics.map(x => x.label).slice(0,20);
  }

  onChange = (e) => {
    console.log('before state',this.state);
    this.setState({
      ...this.state,
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: e.target.value,
      }
    }, () => {console.log('new state',this.state);});
  }

  onChangeNumber = (e) => {
    console.log('before state',this.state);
    this.setState({
      ...this.state,
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: Number(e.target.value),
      }
    }, () => {/*console.log('new state',this.state);*/});
  }

  saveToProject = () => {
    let fields = this.state.inputFields;

    // collect data to save in object
    const sectionTitle = {
      name: fields.name,
      project_id: this.props.project.id,
      section_order: fields.section_order,
      section_title_children: []
    }
    console.log('sectionTitle', sectionTitle);

    //dispatch action to add section title to project
    // this.props.addSectionToProject(sectionTitle);

    //fetch post to db
    this.props.addToBackend(sectionTitle, '/section_titles', 'POST', this.props.addSectionToProject);
  }

  divIdFetch = () => 'section-title-fetch-json';
  divIdInput = () => 'section-title-input-fields';
  setter = (variableName, emptyValue) => {
    if (this.props.data){//console.log('this.props.data.id', this.props.data.id);
      if ((variableName === 'id' && this.props.data[variableName]) || (variableName !== 'id'))
        return this.props.data[variableName];
    }
    return emptyValue;
  }

  state = {
    fetchData: [],
    inputFields: {
      names: {
        divIdFetch: this.divIdFetch(),
        divIdInput: this.divIdInput()
      },
      searchTerm: "",
      holdText: "Enter some text related to this section and click Search.",
      name: this.setter('name', ''),
      url: this.setter('url', ''),
      description:  this.setter('description', ''),
      content: this.setter('content', ''),
      section_order: this.setter('section_order', 0),
      id: this.setter('id', 0),
    }
  }

  render(){
    return (
      <div id={this.props.id}>
        <GenericSearchComponent type='textarea' text={'Topic: '} inputFields={this.state.inputFields} searchTerm={this.state.searchTerm} click={this.getNewData} onChange={this.onChange} />
        <div id='section-title-fetch-container'>
          <NewDataFetchJsonComponent type='textarea' fetchData={this.state.fetchData} inputFields={this.state.inputFields} onChange={this.onChange} />
        </div>
        <NewDataInputFieldsComponent isSectionTitle={true} section_titles={this.props.project.section_titles} inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />
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

export default connect(mapStateToProps, { getSectionTitleData, addSectionToProject, addToBackend })(EditProjectNewSectionTitleContainer);
