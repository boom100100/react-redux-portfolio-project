import React, { Component } from 'react';
import GraphTypesComponent from '../components/GraphTypesComponent';
import GraphNameComponent from '../components/GraphNameComponent';
import GraphXDataContainer from './GraphXDataContainer';
import GraphDrawComponent from '../components/GraphDrawComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';

class EditProjectNewGraphContainer extends Component {
  removeXLabel = (index) => {
    //destructure to remove unnecessary label from state
    const {
      inputFields: {
        graph: {
          graphData: {
            labels: {
              [index]: labelTrash,
              ...otherLabels
            }, ...otherGraphData
          }, ...otherGraph
        }, ...otherInputFields
      }, ...otherState
    } = this.state;

    const newState = {
      ...otherState, inputFields: {
        ...otherInputFields, graph: {
          ...otherGraph, graphData: {
            ...otherGraphData, labels: {
              ...otherLabels
            }}}}}
    this.setState(newState);
  }

  removeXData = (xIndex, setIndex) => {
    //destructure to remove unnecessary label from state
    const {
      inputFields: {
        graph: {
          graphData: {
            datasets: {
              [setIndex]: {
                backgroundColor: {
                  [xIndex]: dataTrashB,
                  ...otherBackgroundColors
                }, hoverBackgroundColor: {
                  [xIndex]: dataTrashH,
                  ...otherHoverBackgroundColors
                }, data:{
                  [xIndex]: dataTrashD,
                  ...otherXindexs
                },
                ...otherDataKeys
              },
              ...otherDatasets
            },
            ...otherGraphData
          }, ...otherGraph
        }, ...otherInputFields
      }, ...otherState
    } = this.state;

    const newState = {
      ...otherState, inputFields: {
        ...otherInputFields, graph: {
          ...otherGraph, graphData: {
            ...otherGraphData, datasets: {
              ...otherDatasets,
              [setIndex]: {
                backgroundColor:{...otherBackgroundColors},
                hoverBackgroundColor:{...otherHoverBackgroundColors},
                data:{...otherXindexs},
                ...otherDataKeys
              }}}}}}
    this.setState(newState);
  }

  changeGraphName = (e) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          options: {
            ...this.state.inputFields.graph.options,
            title: {
              ...this.state.inputFields.graph.options.title,
              text: e.target.value,
            },
          }
        }
      }
    }, () => console.log(this.state));
  }
  addToX = (xIndex, setIndex, addLabelAndData) => {
    console.log(setIndex);
    console.log('state before add',this.state);
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            labels: {
              ...this.state.inputFields.graph.graphData.labels,
              [xIndex]: ''
            },
            datasets: {
              ...this.state.inputFields.graph.graphData.datasets,
              [setIndex]: {
                ...this.state.inputFields.graph.graphData.datasets[setIndex],
                data: {
                  ...this.state.inputFields.graph.graphData.datasets[setIndex].data,
                  [xIndex]: ''
                }
              }
            }
          }
        }
      }
    }, () => {
      console.log('state after addToX',this.state);
      const labelValue = this.state.inputFields.graph.graphData.labels[xIndex];
      const dataValue = this.state.inputFields.graph.graphData.datasets[setIndex][xIndex];
      addLabelAndData(xIndex, labelValue, dataValue);
      //adding label after set state means new data that doesn't get re-rendered
      //doing setState again causes re-render.
      this.setState(this.state);
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
              [e.target.name.split('-')[e.target.name.split('-').length - 1]]: e.target.value
            }
          }
        }
      }
    }, () => console.log(this.state));
  }

  onChangeXData = (e) => {
    const [,,,xIndex,datasetIndex] = e.target.name.split('-');
    const newState = {
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            datasets: {
              ...this.state.inputFields.graph.graphData.datasets,
              [datasetIndex]: {
                ...this.state.inputFields.graph.graphData.datasets[datasetIndex],
                backgroundColor: {
                  ...this.state.inputFields.graph.graphData.datasets[datasetIndex].backgroundColor,
                  [xIndex]: '#000000'
                }, hoverBackgroundColor: {
                  ...this.state.inputFields.graph.graphData.datasets[datasetIndex].hoverBackgroundColor,
                  [xIndex]: '#000000'
                },
                data: {
                  ...this.state.inputFields.graph.graphData.datasets[datasetIndex].data,
                  [xIndex]: e.target.value,
    }}}}}}}
    this.setState(newState, () => console.log(this.state));
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
          labels: {
            0: ''
          },//state.inputFields.graph.labels
          datasets: {
            0: { label: '', backgroundColor: {0: '#000000'}, hoverBackgroundColor: {0: '#000000'}, data: {0: ''} }
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
      names: {
        divIdFetch: 'this.divIdFetch()',
        divIdInput: 'add-new-graph-input-fields'
      },
      description:  "",
      content: ""
    }
  }

  render(){
    return (
      <div id='add-new-graph'>
        <GraphTypesComponent onSelect={this.onSelect} select={this.state.inputFields.graph.type} />
        <GraphNameComponent gName={this.state.inputFields.graph.options.title.text} onChange={this.changeGraphName} />
        <GraphXDataContainer state={this.state} graphData={this.state.inputFields.graph.graphData} addToState={this.addToX} removeXLabel={this.removeXLabel} removeXData={this.removeXData} onChange={this.onChangeXLabel} onChangeXData={this.onChangeXData} />

        <GraphDrawComponent graph={this.state.inputFields.graph} />

        <NewDataInputFieldsComponent inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} />
      </div>
    )
  }
}

export default EditProjectNewGraphContainer;
