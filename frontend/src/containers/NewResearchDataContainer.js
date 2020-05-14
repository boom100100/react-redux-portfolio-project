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

  divIdFetch = () => 'research-data-fetch-json';
  divIdInput = () => 'research-data-input-fields';

  updateDivsArgs = {resultId: 'id', text: 'sourceResource.description'}

  render(){
    return (
      <div id='add-new-research-data'>
        <SearchDataContainer divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getResearchData} getResults={this.getResults} getLink={this.getLink} updateDivsArgs={this.updateDivsArgs} />
      </div>
    )
  }
}

export default connect(null, { getResearchData })(NewResearchDataContainer);
