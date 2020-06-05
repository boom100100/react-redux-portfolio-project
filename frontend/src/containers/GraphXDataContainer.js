import React, { Component } from 'react';
import XLabelComponent from '../components/XLabelComponent';
import XDataComponent from '../components/XDataComponent';

class GraphXDataContainer extends Component {
  //index should be based on state's initial labels, not hard-coded
  // console.log();
  keyCount = 0;
  getInitialXIndex = () => {
    const myKeys = Object.keys(this.props.graphData.labels);
    const lastKey = myKeys[myKeys.length - 1];
    if (typeof lastKey === "undefined")
      return -1;

    return myKeys[myKeys.length - 1]
  }

  getInitialSetIndex = () => {
    const myKeys = Object.keys(this.props.graphData.datasets);
    const lastKey = myKeys[myKeys.length - 1];
    if (typeof lastKey === "undefined")
      return -1;

    return myKeys[myKeys.length - 1]
  }

  getDatasets = () => {

    const propsDatasets = this.props.graphData.datasets;
    const myDatasetsComponents = {};

    let keyBase = this.props.state.inputFields.names.divIdInput;
    if (keyBase)
      keyBase = keyBase + '-';

    const { child_order, section_order, section_title_id } = this.props.state.inputFields;

      for (let dataset in propsDatasets){
        myDatasetsComponents[dataset] = {};
        for (let data in propsDatasets[dataset].data){
          const key = (keyBase || '') /*+ ++this.keyCount */+ data + '-' + section_title_id + '-' + child_order + '-' + dataset;

          const value = propsDatasets[dataset].data[data];
          myDatasetsComponents[dataset][data] = this.myXDataComponent(key, data, value);
        }
      }

      return myDatasetsComponents;
  }

  //gets all current labels
  getLabels = () => {
    const propsLabels = this.props.graphData.labels;
    let keyBase = this.props.state.inputFields.names.divIdInput;
    if (keyBase)
      keyBase = keyBase + '-';
    const { child_order, section_order, section_title_id } = this.props.state.inputFields;

    const myDatasetsComponents = {};

      for (let label in propsLabels){
        //label means key  of object

        const key = (keyBase || '') /*+ ++this.keyCount*/ + label;
        const value = propsLabels[label];
        myDatasetsComponents[label] = this.myXLabelComponent(key, label, value);
      }
      return myDatasetsComponents;
  }


  //"data" is xIndex
  myXDataComponent = (key, data, value) => {return (<XDataComponent key={key} xIndex={data} setIndex={this.setIndex} name={key} value={value} onChange={this.props.onChangeXData} removeData={this.removeData} />)}
  myXLabelComponent = (key, data, value) => {return (<XLabelComponent key={key} xIndex={data} setIndex={this.setIndex} name={key} value={value} onChange={this.props.onChange} onClick={this.removeLabel} />)}

  xIndex = this.getInitialXIndex();
  setIndex = this.getInitialSetIndex();

  labels = () => this.getLabels();
  datasets = () => this.getDatasets();


  showData = () => {
    let innerData = []
    for (let dataset in this.datasets()){
      for (let data in this.datasets()[dataset]){
        innerData = [...innerData, this.datasets()[dataset][data]];
      }
    }
    return innerData;
  }
  showLabels = () => {return Object.values(this.labels());}


  addData = () => {
    this.xIndex++;

    // this.datasets = this.addDataPoint();
    // console.log(this.datasets());
    this.props.addToState(this.xIndex, this.setIndex, this.addLabelAndData);
  }

  addDataSet = () => {
    const newDataset = {};

    for (let key in this.datasets()){
      newDataset[key] = { ...this.datasets()[key], backgroundColor: {
          ...this.datasets()[key].backgroundColor,
          [this.xIndex]: '#000000',
        }, hoverBackgroundColor: {
          ...this.datasets()[key].hoverBackgroundColor,
          [this.xIndex]: '#000000',
        }, data: {
          ...this.datasets()[key].data,
          [this.xIndex]: '',
        }
      }
    }

    return newDataset;
  }

  addDataset = () => {
    this.setIndex++;
  }

  removeLabel = (e, name) => {
    const me = e.target;const partsOfMe = me.name.split('-');

    const id = partsOfMe[partsOfMe.length - 1];
    const ids = partsOfMe.slice(4).join('-');

    const elements = document.getElementsByName('x-label-input-' + name);
    const input = elements[0];

    //remove from state and frontend
    //element manipulation unnecessary
    this.props.removeXLabel(id);

    // TODO:
    //remove from backend
    //do dispatch
    // send project_id, section_title_id, section_title_child_id
    // do put over this graph
  }

  removeData = (e, name) => {
    const me = e.target;const partsOfMe = me.name.split('-');
    const xIndex = partsOfMe[partsOfMe.length - 2];
    const setIndex = partsOfMe[partsOfMe.length - 1];

    this.props.removeXData(xIndex, setIndex);
    //see removeLabel for necessary backend change
  }

  addLabelAndData = (xIndex, labelValue, dataValue) => {
    // TODO: // BUG: produces duplicate keys
    this.labels()[xIndex] = <XLabelComponent name={xIndex} value={dataValue}
      key={this.xIndex} onChange={this.props.onChange}
      onClick={this.removeLabel} />;

    for (let dataset in this.datasets()){
      this.datasets()[dataset][xIndex] = <XDataComponent key={this.xIndex} value={dataValue}
      xIndex={this.xIndex} setIndex={dataset} onChange={this.props.onChangeXData} removeData={this.removeData} />;
    }

  }



  render(){
    return (
      <>
        <div name='graph-x-labels-holder'>
          <button onClick={e => this.addData(e)}>Add Data</button>
          {this.showLabels()}
        </div>

        <div name='graph-x-data-points-holder'>
          {this.showData()}
        </div>

      </>
    )
  }
}

export default GraphXDataContainer;
