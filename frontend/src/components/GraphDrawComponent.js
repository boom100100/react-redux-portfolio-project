import React from 'react';
import {Pie, Doughnut, Bar} from 'react-chartjs-2';

const GraphDrawComponent = (props) => {
  const { graphData } = props.graph;
  const setsOfData = [];
  const datasets = () => {
    //formats data so react-chartjs-2 can read it
    //see https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
    //for required format
    for (let dset of Object.values(graphData.datasets)){
      let obj = {};

      obj.label = dset.label;
      obj.backgroundColor = Object.values(dset.backgroundColor);
      obj.hoverBackgroundColor = Object.values(dset.backgroundColor);
      obj.data = Object.values(dset.data);

      setsOfData.push(obj);
    }

    return setsOfData;
  }



  const data = { ...graphData,
    labels: Object.values(graphData.labels),
    datasets: datasets()
  }

  // const options = {} //for restructuring passed-in data so react-chartjs-2 can read it
  return (
    <>
    <div id='add-new-graph-bar'>
      <Bar data={data} options={props.graph.options} />
    </div>
    {/*<div id='add-new-graph-pie'>
      <Pie data={data} options={props.graph.options} />
    </div>
    <div id='add-new-graph-doughnut'>
      <Doughnut data={data} options={props.graph.options} />
    </div>*/}
    </>
  )
}
export default GraphDrawComponent;
