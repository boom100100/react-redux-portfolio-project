import React from 'react';
import { getResearchData } from '../actions/DataResearchActions';
import NewDataFetchJsonComponent from '../components/NewDataFetchJsonComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import { connect } from 'react-redux';

//https://uselessfacts.jsph.pl/random.json
class NewResearchDataContainer extends React.Component {
  componentDidMount(){
    // this.getNewData();
  }
  getNewData = () => {
    // this.props.getResearchData();
    // console.log('getting new data.');
  }

  saveToProject = () => {}

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
        divIdFetch: 'research-data-fetch-json',
        divIdInput: 'research-data-input-fields'
      },
      name: "",
      url: "",
      description:  "",
      content: ""
    },

  }
  render(){
    return (
      <div id='add-new-research-data'>
        Research data holder.
        <NewDataFetchJsonComponent fetchData={this.state.fetchData} inputFields={this.state.inputFields} />
        <NewDataInputFieldsComponent inputFields={this.state.inputFields} />
      </div>
    )
  }
}

export default connect(null, {getResearchData})(NewResearchDataContainer);
