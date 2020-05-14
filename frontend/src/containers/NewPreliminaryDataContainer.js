import React from 'react';
import { getPreliminaryData } from '../actions/DataResearchActions';
import GenericSearchComponent from '../components/GenericSearchComponent';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class NewPreliminaryDataContainer extends React.Component {

  getNewData = () => {
    let searchTerm = this.state.inputFields.searchTerm.replace(/ /gi,'+');
    this.props.getPreliminaryData(this.updatefetchData, searchTerm);
    // console.log('getting new data.');
  }

  saveToProject = () => {
    console.log('clicked save prelim');
  }

  updatefetchData = (json) => {
    this.setState({
      fetchData: [...json.query.search],
      inputFields: {
        names: {...this.state.inputFields.names},
        holdText: "Click Select to choose data. Add a name and description. Press Save Data. You can save one data point at a time.",
        searchTerm: "",
        name: "",
        description:  "",
        url: "",
        content: "",
      }
    }, () => {
      this.updateDivs();
    });
  }

  updateDivs = () => {
    document.getElementById('preliminary-data-fetch-json').innerText = '';

    for (let result of this.state.fetchData) {
      // console.log(result);
      let url = 'https://en.wikipedia.org/?curid=' + result.pageid;
      this.doElementUpdate('preliminary-data-fetch-json', 'preliminary-data-fetch-json-text' + result.pageid, result.snippet, 'div');
      this.doElementUpdate('preliminary-data-fetch-json', 'preliminary-data-fetch-json-url' + result.pageid, url, 'a', url);
      this.doElementUpdate('preliminary-data-fetch-json', 'preliminary-data-fetch-json-picker' + result.pageid, "Select", 'button', null, this.saveToProject);
    }
  }


  doElementUpdate = (divId, childId, innerText, type, href, onClick) => {
    let parent = document.getElementById(divId);

    let child = (document.getElementById(childId) || document.createElement(type));
    child.id = childId + '';
    child.innerHTML = innerText;

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

  chooseResult = () => {}

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

  state = {
    fetchData: []/*{
      id:"",
      text: "",
      source:"",
      source_url:"",
      language:"",
      permalink: ""
    }*/,
    inputFields: {
      names: {
        divIdFetch: 'preliminary-data-fetch-json',
        divIdInput: 'preliminary-data-input-fields'
      },
      searchTerm: "",
      holdText: "Enter a search term and click Search.",
      name: "",
      url: "",
      description:  "",
      content: ""
    }
  }
  render(){
    return (
      <div id='add-new-preliminary-data'>
        <GenericSearchComponent inputFields={this.state.inputFields} searchTerm={this.state.searchTerm} click={this.getNewData} onChange={this.onChange} />
        <NewDataFetchJsonComponent fetchData={this.state.fetchData} inputFields={this.state.inputFields} />

        <NewDataInputFieldsComponent inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} />
      </div>
    )
  }
}

export default connect(null, { getPreliminaryData })(NewPreliminaryDataContainer);
