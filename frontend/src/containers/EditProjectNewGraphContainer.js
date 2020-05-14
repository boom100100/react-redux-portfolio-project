import React, { Component } from 'react';
import GraphTypesComponent from '../components/GraphTypesComponent';
import GraphXLabelsContainer from './GraphXLabelsContainer';
import GraphDataSetsContainer from './GraphDataSetsContainer';

class EditProjectNewGraphContainer extends Component {
  state = {
    fetchParts: {},
    databaseParts: {}
  }
  componentDidMount(){

  }
  //will build graph in real-time instead getNewData(){}
  onSelect = (e) => {}

  render(){
    return (
      <div id='add-new-graph'>
        Graph holder.
        <GraphTypesComponent onSelect={this.onSelect} />
        <GraphXLabelsContainer />
        <GraphDataSetsContainer />
      </div>
    )
  }
}

export default EditProjectNewGraphContainer;
