import React, { Component } from 'react';
import GenericSearchComponent from  '../components/GenericSearchComponent';
import NewDataFetchJsonComponent from  '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from  '../components/NewDataInputFieldsComponent';

class EditProjectNewSectionTitleContainer extends Component {
  getNewData = () => {}

  divIdFetch = () => 'section-title-fetch-json';
  divIdInput = () => 'section-title-input-fields';

  state = {
    fetchData: [],
    inputFields: {
      names: {
        divIdFetch: this.divIdFetch(),
        divIdInput: this.divIdInput()
      },
      searchTerm: "",
      holdText: "Enter a topic word or phrase and click Search.",
      name: "",
      url: "",
      description:  "",
      content: ""
    }
  }

  render(){
    return (
      <div id='add-new-section-title'>
        <GenericSearchComponent text={'Topic: '}inputFields={this.state.inputFields} searchTerm={this.state.searchTerm} click={this.getNewData} onChange={this.onChange} />

        <NewDataFetchJsonComponent fetchData={this.state.fetchData} inputFields={this.state.inputFields} />
        <NewDataInputFieldsComponent inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} />
      </div>
    )
  }
}

export default EditProjectNewSectionTitleContainer;
