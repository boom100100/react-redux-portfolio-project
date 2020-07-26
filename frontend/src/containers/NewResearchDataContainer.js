import React from 'react';
import SearchDataContainer from './SearchDataContainer'
import { getResearchData } from '../actions/DataResearchActions';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class NewResearchDataContainer extends React.Component {

  getResults = (json) => {
    return json.docs;
  }

  getLink = (result) => {
    return result.isShownAt;
  }

  divId = (base) => {
    if (this.props.data){
      // console.log('this.props.data', this.props.data);
      let { data } = this.props;
      return base + '-' + data.section_title_id + '-' + data.child_order;
    }
    return base
  }

  divIdFetch = () => this.divId('research-data-fetch-json');
  divIdInput = () => this.divId('research-data-input-fields');

  updateDivsArgs = {resultId: 'id', text: 'sourceResource.description'}

  render(){
    return (
      <div id={this.props.id} >
        <SearchDataContainer myCall={this.props.myCall} myCallback={this.props.myCallback} relativeUrl={this.props.relativeUrl} saveMethod={this.props.saveMethod} data={this.props.data} type='ResearchDatum' divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getResearchData} getResults={this.getResults} getLink={this.getLink} updateDivsArgs={this.updateDivsArgs} />
      </div>
    )
  }
}

export default connect(null, { getResearchData })(NewResearchDataContainer);
