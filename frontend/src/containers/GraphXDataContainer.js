import React, { Component } from 'react';
import XLabelComponent from '../components/XLabelComponent';
import XDataComponent from '../components/XDataComponent';

class GraphXDataContainer extends Component {
  //index should be based on state's initial labels, not hard-coded
  // console.log();
  getInitialXIndex = () => {
    const myKeys = Object.keys(this.props.graphData.labels);
    const lastKey = myKeys[myKeys.length - 1];
    // console.log('lastKey', lastKey);
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

  getInitialDatasets = () => {
    const propsDatasets = this.props.graphData.datasets;
    const myDatasetsComponents = {};

      for (let dataset in propsDatasets){
        // console.log('dataset', dataset);
        myDatasetsComponents[dataset] = {};
        for (let data in propsDatasets[dataset].data){
          // console.log('data', data);
           myDatasetsComponents[dataset][data] = this.myXDataComponent(data);
        }
      }
      // console.log('Object.keys(myDatasetsComponents).length', Object.keys(myDatasetsComponents).length);
      // console.log('myDatasetsComponents', myDatasetsComponents);
      return myDatasetsComponents;
  }

  getInitialLabels = () => {
    const propsLabels = this.props.graphData.labels;
    const keyBase = this.props.state.inputFields.divIdFetch;
    const myDatasetsComponents = {};
    for (let label in propsLabels){
      const key = keyBase + '-' + label
      
      myDatasetsComponents[label] = this.myXLabelComponent(label, propsLabels[label], key);
    }
    return myDatasetsComponents;
  }


  //"data" is xIndex
  myXDataComponent = (data) => {return <XDataComponent key={data} xIndex={data} setIndex={this.setIndex} value={this.props.graphData.datasets[this.setIndex][data]} onChange={this.props.onChangeXData} removeData={this.removeData} />}
  myXLabelComponent = (data, value, key) => {console.log('data', data);console.log('props', this.props);return <XLabelComponent key={key} name={data} value={value} onChange={this.props.onChange} onClick={this.removeLabel} />}

  xIndex = this.getInitialXIndex();
  setIndex = this.getInitialSetIndex();

  labels = () => this.getInitialLabels();
  datasets = this.getInitialDatasets();


  showData = () => {
    let innerData = []
    for (let dataset in this.datasets){
      for (let data in this.datasets[dataset]){
        innerData = [...innerData, this.datasets[dataset][data]];
      }
    }
    return innerData;
  }
  showLabels = () => Object.values(this.labels());


  addData = () => {
    this.xIndex++;

    console.log(this.datasets);
    this.props.addToState(this.xIndex, this.setIndex, this.addLabelAndData);
  }

  addDataSet = () => {
    const newDataset = {};

    for (let key in this.datasets){
      newDataset[key] = { ...this.datasets[key], backgroundColor: {
          ...this.datasets[key].backgroundColor,
          [this.xIndex]: '#000000',
        }, hoverBackgroundColor: {
          ...this.datasets[key].hoverBackgroundColor,
          [this.xIndex]: '#000000',
        }, data: {
          ...this.datasets[key].data,
          [this.xIndex]: '',
        }
      }
    }

    return newDataset;
  }

  addDataset = () => {
    this.setIndex++;
  }

  removeLabel = (e) => {
    const me = e.target;const partsOfMe = me.name.split('-');
    const id = partsOfMe[partsOfMe.length - 1];
    const input = document.getElementsByName('x-label-input-' + id)[0]

    //remove from state
    this.props.removeXLabel(id);

    input.parentElement.removeChild(input);
    me.parentElement.removeChild(me);
  }

  removeData = (e) => {
    const me = e.target;const partsOfMe = me.name.split('-');
    const xIndex = partsOfMe[partsOfMe.length - 2];
    const setIndex = partsOfMe[partsOfMe.length - 1];

    this.props.removeXData(xIndex, setIndex);

    const input = document.getElementsByName('x-data-input-' + xIndex + '-' + setIndex)[0]

    input.parentElement.removeChild(input);
    me.parentElement.removeChild(me);
  }

  addLabelAndData = (xIndex, labelValue, dataValue) => {
    console.log('dataValue', dataValue);
    this.labels[xIndex] = <XLabelComponent name={xIndex} value={undefined}
      key={this.xIndex} onChange={this.props.onChange}
      onClick={this.removeLabel} />;
    console.log(this.labels);

    console.log('setIndex', this.setIndex);
    console.log('xIndex', xIndex);
    console.log('dataValue', dataValue);
    // console.log();
    for (let dataset in this.datasets){
      this.datasets[dataset][xIndex] = <XDataComponent key={this.xIndex} value={dataValue}
      xIndex={this.xIndex} setIndex={dataset} onChange={this.props.onChangeXData} removeData={this.removeData} />;
    }

    console.log('this.datasets', this.datasets);
    // this.render();
  }



  render(){
    return (
      <>
        <div id='graph-x-labels-holder'>
          <button onClick={this.addData}>Add Data</button>
          {this.showLabels()}
        </div>

        <div id='graph-x-data-points-holder'>
          {this.showData()}
        </div>

      </>
    )
  }
}

export default GraphXDataContainer;
