import React, { Component } from 'react';
import XLabelComponent from '../components/XLabelComponent'

class GraphXLabelsContainer extends Component {
  index = -1;

  labels = {};
  showInputList = () => {
    return Object.values(this.labels);
  }

  addLabel = () => {
    debugger;
    this.index++;
    this.props.addToState(this.index, this.addLabelElement);
  }

  removeLabel = (e) => {
    const me = e.target;
    console.log(me);

    //remove from state
    // this.props.removeFromState(/*me.name*/);
    //remove input field, button
    me.parentElement.removeChild(me);
  }

  addLabelElement = (name, value) => {

    this.labels[name] = <XLabelComponent name={name} value={value}
      key={this.index} onChange={this.props.onChange}
      onClick={this.removeLabel} />;
    console.log(this.labels);
  }

  render(){
    return (
      <div id='graph-x-labels-holder'>
        <button onClick={this.addLabel}>Add label</button>
        {this.showInputList()}

      </div>
    )
  }
}

export default GraphXLabelsContainer;
