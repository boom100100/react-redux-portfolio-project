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

  divId = (base) => {
    if (this.props.data){
      // console.log('this.props.data', this.props.data);
      let { data } = this.props;
      return base + '-' + data.section_title_id + '-' + data.child_order;
    }
    return base
  }

  divIdFetch = () => this.divId('preliminary-data-fetch-json');
  divIdInput = () => this.divId('preliminary-data-input-fields');

  updateDivsArgs = {resultId: 'pageid', text: 'snippet'}

  render(){
    return (
      <div id={this.props.id}>
        <SearchDataContainer data={this.props.data} type='PreliminaryDatum' divIdFetch={this.divIdFetch} divIdInput={this.divIdInput} get={this.props.getPreliminaryData} getResults={this.getResults} getLink={this.getLink} updateDivsArgs={this.updateDivsArgs} myCall={this.props.myCall} myCallback={this.props.myCallback} relativeUrl={this.props.relativeUrl} saveMethod={this.props.saveMethod} />
      </div>
    )
  }
}

export default connect(null, { getPreliminaryData })(NewPreliminaryDataContainer);
