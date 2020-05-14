import React from 'react';
import SearchDataContainer from './SearchDataContainer'
import { getPreliminaryData } from '../actions/DataResearchActions';
import { connect } from 'react-redux';

//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Wikipedia+English&format=jsonclass NewPreliminaryDataContainer extends React.Component {
class NewPreliminaryDataContainer extends React.Component {

  getResults = (json) => {
    return json.query.search;
  }

  divIdFetch = () => 'preliminary-data-fetch-json';
  divIdInput = () => 'preliminary-data-input-fields';

  updateDivsArgs = {resultId: 'pageid', text: 'snippet', link: 'https://en.wikipedia.org/?curid='}

  render(){
    return (
      <div id='add-new-preliminary-data'>
        <SearchDataContainer divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getPreliminaryData} getResults={this.getResults} updateDivsArgs={this.updateDivsArgs}/>
      </div>
    )
  }
}

export default connect(null, { getPreliminaryData })(NewPreliminaryDataContainer);
