import React from 'react';
import GenericSearchComponent from '../components/GenericSearchComponent';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class SearchDataContainer extends React.Component {

  getNewData = () => {
    const searchTerm = this.state.inputFields.searchTerm.replace(/ /gi,'+');
    this.props.get(this.updatefetchData, searchTerm);
  }

  updatefetchData = (json) => {

    const results = this.props.getResults(json);
    this.setState({
      fetchData: [...results],
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

    for (let result of this.state.fetchData) {
      const url = this.props.getLink(result);

      this.doElementUpdate(parentId, parentId + '-text-' + result[resultId], text.split('.').reduce(index, result), 'div');
      this.doElementUpdate(parentId, parentId + '-url-' + result[resultId], url, 'a', url);
      this.doElementUpdate(parentId, parentId + '-picker-' + result[resultId], "Select", 'button', null, this.saveToProject);
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

  state = {
    fetchData: [],
    inputFields: {
      names: {
        divIdFetch: this.props.divIdFetch(),
        divIdInput: this.props.divIdInput()
      },
      searchTerm: "",
      holdText: "Enter a search term and click Search.",
      name: "",
      url: "",
      description:  "",
      content: ""
    }
  }

  chooseResult = () => {}
  saveToProject = () => {
    console.log('clicked save prelim');
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


export default SearchDataContainer;
