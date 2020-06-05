import React, { Component } from 'react';
import GraphTypesComponent from '../components/GraphTypesComponent';
import GraphNameComponent from '../components/GraphNameComponent';
import GraphXDataContainer from './GraphXDataContainer';
import GraphDrawComponent from '../components/GraphDrawComponent';
import NewDataInputFieldsComponent from '../components/NewDataInputFieldsComponent';
import { addDataToProject, addToBackend } from '../actions/ProjectActions';
import { connect } from 'react-redux';


class EditProjectNewGraphContainer extends Component {
  saveToProject = () => {
    let fields = this.state.inputFields;
    console.log('fields', fields);
    // collect data to save in object
    const graphData = {
      name: fields.name,
      project_id: this.props.project.id,
      section_order: fields.section_order,
      child_order: fields.child_order,
      description:  fields.description,
      content: fields.graph,
      type: 'Graph',
      url: ''
    }
    console.log('graphData', graphData);

    //dispatch action to add data to project
    // this.props.addDataToProject(graphData);

    //fetch post to db
    this.props.addToBackend(graphData, '/section_title_children', 'POST', this.props.addDataToProject);
  }

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
    //destructure to remove unnecessary data points from state
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
      console.log('this.state.inputFields.graph.graphData.datasets', this.state.inputFields.graph.graphData.datasets);
      console.log('this.state.inputFields.graph.graphData.datasets[setIndex]', this.state.inputFields.graph.graphData.datasets[setIndex]);
      console.log('this.state.inputFields.graph.graphData.datasets[setIndex].data[xIndex]', this.state.inputFields.graph.graphData.datasets[setIndex].data[xIndex]);
      const dataValue = this.state.inputFields.graph.graphData.datasets[setIndex].data[xIndex];
      console.log('dataValue', dataValue);
      addLabelAndData(xIndex, labelValue, dataValue);
      //adding label after set state means new data that doesn't get re-rendered
      //doing setState again causes re-render.
      this.setState(this.state);
    });
  }

  onChangeXLabel = (e) => {
    //change label that corresponds with input field
    const array = e.target.name.split('-');
    const oldLabel = array[array.length - 1];
    const newValue = e.target.value;

    this.setState({
      inputFields: {
        ...this.state.inputFields,
        graph: {
          ...this.state.inputFields.graph,
          graphData: {
            ...this.state.inputFields.graph.graphData,
            labels: {
              ...this.state.inputFields.graph.graphData.labels,
              [oldLabel]: newValue
            }
          }
        }
      }
    });
  }

  onChangeXData = (e) => {
    // console.log('e', e);
    const array = e.target.name.split('-');
    const xIndex = array[array.length -2];
    const datasetIndex = array[array.length -1];

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
    this.setState(newState);
  }

  // componentDidMount(){
  //   // console.log('this.state.inputFields.graph.graphData', this.state.inputFields.graph.graphData);
  //   // document.getElementById('add-new-graph-doughnut').style.display = 'none';
  //   // document.getElementById('add-new-graph-pie').style.display = 'none';
  // }

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
  onChange = (e) => {
    this.setState({
      ...this.state,
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: e.target.value,
      }
    });
  }

  onChangeNumber = (e, newFocus, newOptions, sectionOrder) => {
    this.setState({
      ...this.state,
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: Number(e.target.value),
      }
    }, () => {
      // console.log('new state',this.state);
      // console.log('newFocus', newFocus);

      if (newOptions)
        newOptions(sectionOrder);

      if (window.newFocus)
        window.newFocus();

    });
  }
  graphSet = () => {
    return (
      {
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
      }
    )
  };

  graphSetter = (emptyValue) => {
    // console.log('this.props', this.props);
    // console.log('emptyValue', emptyValue);
    if (this.props.data)//replace this.props.data - nothing will be handed down
      if (this.props.data.type === "Graph")
        if (this.props.data.content)
          if (this.props.data.content.graph)
            return this.props.data.content.graph;
    return emptyValue;
  }

  setter = (variableName, emptyValue) => {
    // console.log('setter this.props', this.props);

    // if this component was given data
    if (this.props.data){
      // console.log('this.props.data.id', this.props.data.id);
      if ((this.props.data[variableName]) && (variableName === 'id' && this.props.data[variableName]) || (variableName !== 'id')){
        return this.props.data[variableName];} else if (variableName !== 'id') {return this.props[variableName]}
      }
    return emptyValue;
  }

  divIdFetch = () => {}
  state = {
    inputFields: {
      graph: this.graphSetter(this.graphSet()),
      name: this.setter('name', ''),
      names: {
        divIdFetch: this.setter(null, ''),//this.divIdFetch(),
        divIdInput: this.setter('id', 'add-new-graph-input-fields')
      },
      description:  this.setter('description', ''),
      content: this.graphSetter(this.graphSet()),
      section_order: this.setter('section_order', 0),
      child_order: this.setter('child_order', 0),
      section_title_id: this.setter('section_title_id', 0),
    }
  }

  render(){
    return (
      <div id={this.props.id}>
        {undefined/*console.log('this.props.id', this.props.id)*/}
        <GraphTypesComponent onSelect={this.onSelect} select={this.state.inputFields.graph.type} />
        <GraphNameComponent gName={this.state.inputFields.graph.options.title.text} onChange={this.changeGraphName} />
        <GraphXDataContainer state={this.state} graphData={this.state.inputFields.graph.graphData} addToState={this.addToX} removeXLabel={this.removeXLabel} removeXData={this.removeXData} onChange={this.onChangeXLabel} onChangeXData={this.onChangeXData} />

        <GraphDrawComponent graph={this.state.inputFields.graph} />

        <NewDataInputFieldsComponent childOrderId='graph-section-child-order' isSectionTitle={false} section_titles={this.props.project.section_titles} inputFields={this.state.inputFields} click={this.saveToProject} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  return {
    project: state.projects[id-1],
    projects: state.projects
  }
}

export default connect(mapStateToProps, { addDataToProject, addToBackend })(EditProjectNewGraphContainer);
