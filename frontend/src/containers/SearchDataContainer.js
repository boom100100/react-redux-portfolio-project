import React from 'react';
import GenericSearchComponent from '../components/GenericSearchComponent';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import { addDataToProject, addToBackend } from '../actions/ProjectActions';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class SearchDataContainer extends React.Component {
  componentDidMount(){
    if (this.props.data)
      this.updateDivs();
  }

  getNewData = () => {
    const searchTerm = this.state.inputFields.searchTerm.replace(/ /gi,'+');
    this.props.get(this.updatefetchData, searchTerm);
  }

  updatefetchData = (json) => {

    const results = this.props.getResults(json);
    this.setState({
      fetchData: [...results],
      inputFields: {
        ...this.state.inputFields,
        holdText: "Click Select to choose data. Add a name and description. Press Save Data. You can save one data point at a time.",
      }
    }, () => {
      const {resultId, text} = this.props.updateDivsArgs;
      this.updateDivs(resultId, text);
    });
  }

  updateDivs = (resultId, text) => {
    //index function allows multiple dot operators
    //to go necessary levels deep into hash
    function index(obj,i) {return obj[i]}

    const parentId = this.state.inputFields.names.divIdFetch;
    document.getElementById(parentId).innerText = '';
    if (this.props.data){
      this.doElementUpdate(parentId, parentId + '-text', this.state.inputFields.content, 'div');
      this.doElementUpdate(parentId, parentId + '-url', this.state.inputFields.url, 'a', this.state.inputFields.url);
    } else {
      for (let result of this.state.fetchData) {
        const url = this.props.getLink(result);

        this.doElementUpdate(parentId, parentId + '-text-' + result[resultId], text.split('.').reduce(index, result), 'div');
        this.doElementUpdate(parentId, parentId + '-url-' + result[resultId], url, 'a', url);
        this.doElementUpdate(parentId, parentId + '-picker-' + result[resultId], "Select", 'button', null, this.chooseResult);
      }
    }
  }


  doElementUpdate = (divId, childId, innerHTML, type, href, onClick) => {
    const parent = document.getElementById(divId);

    const child = (document.getElementById(childId) || document.createElement(type));
    child.id = childId + '';
    child.innerHTML = innerHTML;

    if (child.tagName === 'A') {
      child.href = href;
      child.target = "_blank";
    } else if (child.tagName === 'BUTTON') {
      child.addEventListener("click", onClick);
    } else {
       child.innerHTML = child.innerHTML + '...';
    }

    parent.appendChild(child);
  }



  onChange = (e) => {
    this.setState({
      fetchData: {...this.state.fetchData},
      inputFields: {
        names: {...this.state.inputFields.names},
        ...this.state.inputFields,
        [e.target.name]: e.target.value
      }
    });
  }

  onChangeNumber = (e) => {
    this.setState({
      fetchData: {...this.state.fetchData},
      inputFields: {
        // names: {...this.state.inputFields.names},
        ...this.state.inputFields,
        [e.target.name]: Number(e.target.value)
      }
    }, () => console.log('after state', this.state));
  }

  getSavedData = (variableName, emptyValue) => {
    // console.log('this.props.data', this.props.data);
    // console.log('this.props', this.props);
    if (this.props.data)
      return this.props.data[variableName];
    return emptyValue;
  }

  state = {
    fetchData: [],
    inputFields: {
      names: {
        divIdFetch: this.props.divIdFetch(),
        divIdInput: this.props.divIdInput()
      },
      searchTerm: "",
      holdText: "Enter a search term and click Search.",
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

  chooseResult = (e) => {

    let curidSplit = e.target.id.split('-');
    let curid = curidSplit[curidSplit.length - 1];

    //extract values for state
    let content = document.getElementById(this.state.inputFields.names.divIdFetch + '-text-' + curid).innerText;
    let url = document.getElementById(this.state.inputFields.names.divIdFetch + '-url-' + curid).href;

    //add extracted values to state
    this.setState({
      fetchData: {...this.state.fetchData},
      inputFields: {
        //names: {...this.state.inputFields.names},
        ...this.state.inputFields,
        content: content,
        url: url
      }
    }, () => {
      //deselect all buttons
      document.getElementById(this.state.inputFields.names.divIdFetch).querySelectorAll('button').forEach(button => {
      	  button.innerText = "Select";
      	});

      //show button as selected
      e.target.innerText = 'Selected';
      
    });





  }
  saveToProject = () => {

    let fields = this.state.inputFields;
    const id = fields.section_title_child_id;

    // collect data to save in object
    const data = {
      section_title_child_id: id,
      section_title_id: fields.section_title_id,
      prev_section_title_id: fields.prev_section_title_id,
      name: fields.name,
      project_id: this.props.project.id,
      section_order: fields.section_order,
      child_order: fields.child_order,
      description:  fields.description,
      content: fields.content,
      type: this.props.type,
      url: fields.url
    }
    console.log('data', data);

    //dispatch action to add data to project
    // this.props.addDataToProject(data);

    //fetch post to db
    this.props.addToBackend(data, '/section_title_children/' + (id || ""), this.props.saveMethod, this.props.addDataToProject);
  }

  render(){
    return (
      <>
        <GenericSearchComponent type='input' text={'Search term: '}inputFields={this.state.inputFields} searchTerm={this.state.searchTerm} click={this.getNewData} onChange={this.onChange} />
        <NewDataFetchJsonComponent type='div' fetchData={this.state.fetchData} inputFields={this.state.inputFields} />

        <NewDataInputFieldsComponent isSectionTitle={false} section_titles={this.props.project.section_titles} inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />
      </>
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

export default connect(mapStateToProps, { addDataToProject, addToBackend })(SearchDataContainer);
