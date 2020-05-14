import React from 'react';
import SearchDataContainer from './SearchDataContainer'
import { getPreliminaryData } from '../actions/DataResearchActions';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class NewPreliminaryDataContainer extends React.Component {

  getResults = (json) => {
    return json.query.search;
  }

  getLink = (result) => {
    return 'https://en.wikipedia.org/?curid=' + result.pageid.toString();
  }

  divIdFetch = () => 'preliminary-data-fetch-json';
  divIdInput = () => 'preliminary-data-input-fields';

  updateDivsArgs = {resultId: 'pageid', text: 'snippet'}

  render(){
    return (
      <div id='add-new-preliminary-data'>
        <SearchDataContainer divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getPreliminaryData} getResults={this.getResults} getLink={this.getLink} updateDivsArgs={this.updateDivsArgs}/>
      </div>
    )
  }
}

export default connect(null, { getPreliminaryData })(NewPreliminaryDataContainer);
