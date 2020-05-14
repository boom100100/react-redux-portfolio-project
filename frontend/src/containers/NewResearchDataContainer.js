import React from 'react';
import SearchDataContainer from './SearchDataContainer'
import { getResearchData } from '../actions/DataResearchActions';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class NewResearchDataContainer extends React.Component {

  getResults = (json) => {
    return json.query.search;
  }

  divIdFetch = () => 'research-data-fetch-json';
  divIdInput = () => 'research-data-input-fields';

  updateDivsArgs = {resultId: 'pageid', text: 'snippet', link: 'https://en.wikipedia.org/?curid='}

  render(){
    return (
      <div id='add-new-research-data'>
        <SearchDataContainer divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getResearchData} getResults={this.getResults} updateDivsArgs={this.updateDivsArgs}/>
      </div>
    )
  }
}

export default connect(null, { getResearchData })(NewResearchDataContainer);
