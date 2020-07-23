import React, {Component} from 'react';
import GraphDrawComponent from '../components/GraphDrawComponent'
import { connect } from 'react-redux';

class ProjectReadContainer extends Component {
  showData = () => {
    const components = [];
    // return (<div>showData successful.</div>);

    //for each section title
      // return formatted section title, add to array
      // return formatted children, add to array
    // return array

    for (let section of this.props.project.section_titles){
      components.push(<ReadSectionTitle name={section.name} key={section.name + '-' + section.id} />);
      for (let child of section.section_title_children){
        console.log('child', child);
        switch(child.type) {
          case 'Graph':
            components.push(<ReadGraph graph={child.content.graph} description={child.description} key={child.type + '-' + child.name + '-' + child.id} />);
            break;
          default:
            components.push(<ReadResearch content={child.content} description={child.description} key={child.type + '-' + child.name + '-' + child.id} />);
        }

      }
    }

    return components;
  }
  
  render(){
    return (
      <div>
        <div>ProjectReadContainer</div>

        <h1>{this.props.project.name}</h1>

        {this.props.project.abstract != '' ? (
          <>
            <h2>Abstract</h2>
            <p>{this.props.project.abstract}</p>
          </>
        ) : undefined}

        {this.props.project.section_titles.length > 0 ? (
          <div>
          <h2>Content</h2>
          {this.showData()}
          </div>
        ) : undefined}


      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id);

  return {
    project: state.projects[index]
  }
}

export default connect(mapStateToProps)(ProjectReadContainer);


const ReadSectionTitle = (props) => {
  return (
    <h3>{props.name}</h3>
  );
}
const ReadGraph = (props) => {
  return (
    <div>
      <div><GraphDrawComponent graph={props.graph} /></div>
      <p>{props.description}</p>
    </div>
  );
}

const ReadResearch = (props) => {
  return (
    <div>
      <p><span>{props.content}</span> <span>{props.description}</span></p>
    </div>
  );
}
