import React, { Component } from 'react';
import GraphTypesComponent from '../components/GraphTypesComponent';
import GraphXLabelsContainer from './GraphXLabelsContainer';
import GraphDataSetsContainer from './GraphDataSetsContainer';
import GraphDrawComponent from '../components/GraphDrawComponent';

class EditProjectNewGraphContainer extends Component {
  removeXLabel = (index) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            labels: {
              ...this.state.inputFields.graph.graphData.labels,
              [index]: undefined
            }
          }
        }
      }
    }, () => {console.log(this.state);});
  }

  addXLabel = (index, addLabelElement) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            labels: {
              ...this.state.inputFields.graph.graphData.labels,
              [index]: ''
            }
          }
        }
      }
    }, () => {
      addLabelElement(index);
    });
  }

  onChangeXLabel = (e) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            labels: {
              ...this.state.inputFields.graph.graphData.labels,
              [e.target.name]: e.target.value
            }
          }
        }
      }
    }, () => console.log(this.state));
  }

  componentDidMount(){
    document.getElementById('add-new-graph-doughnut').style.display = 'none';
    document.getElementById('add-new-graph-pie').style.display = 'none';
  }

  onSelect = (e) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          type: e.target.value
        }
      }
    });

    switch(e.target.value){
      case 'bar':
        document.getElementById('add-new-graph-bar').style.display = 'block';
        document.getElementById('add-new-graph-doughnut').style.display = 'none';
        document.getElementById('add-new-graph-pie').style.display = 'none';
        // document.getElementById('add-new-graph-scatter').style.display = 'none';
        break;
      case 'doughnut':
        document.getElementById('add-new-graph-bar').style.display = 'none';
        document.getElementById('add-new-graph-doughnut').style.display = 'block';
        document.getElementById('add-new-graph-pie').style.display = 'none';
        // document.getElementById('add-new-graph-scatter').style.display = 'none';
        break;
      case 'pie':
        document.getElementById('add-new-graph-bar').style.display = 'none';
        document.getElementById('add-new-graph-doughnut').style.display = 'none';
        document.getElementById('add-new-graph-pie').style.display = 'block';
        // document.getElementById('add-new-graph-scatter').style.display = 'none';
        break;
      case 'scatter':
        document.getElementById('add-new-graph-bar').style.display = 'none';
        document.getElementById('add-new-graph-doughnut').style.display = 'none';
        document.getElementById('add-new-graph-pie').style.display = 'none';
        // document.getElementById('add-new-graph-scatter').style.display = 'block';
        break;
      default:
        break;
    }

  }

  state = {
    inputFields: {
      graph: {
        type: 'bar',
        graphData: {
          labels: {},//state.inputFields.graph.labels
          datasets: {
            0: { label: '', backgroundColor: {}, hoverBackgroundColor: {}, data: {} }
          }
        },
        options: {
          title:{
            display:true,
            text:'Name Your Chart',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }
      },
      name: "",
      url: "",
      description:  "",
      content: ""
    }
  }

  render(){
    return (
      <div id='add-new-graph'>
        <GraphTypesComponent onSelect={this.onSelect} select={this.state.inputFields.graph.type} />
        <GraphXLabelsContainer labels={this.state.inputFields.graph.graphData.labels} addToState={this.addXLabel} removeFromState={this.removeXLabel} onChange={this.onChangeXLabel} />
        <GraphDataSetsContainer />
        <GraphDrawComponent graph={this.state.inputFields.graph} />
      </div>
    )
  }
}

export default EditProjectNewGraphContainer;
