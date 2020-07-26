import React, {Component} from 'react';
import * as editHelpers from '../containers/helpers/EditProjectHelpers';
import { updateSectionState, updateSection, updateDataState, updateData } from '../actions/ProjectActions';
import { connect } from 'react-redux';

import EditProjectNewSectionTitleContainer from '../containers/EditProjectNewSectionTitleContainer';
import EditProjectNewGraphContainer from '../containers/EditProjectNewGraphContainer';
import NewRandomDataContainer from '../containers/NewRandomDataContainer';
import NewPreliminaryDataContainer from '../containers/NewPreliminaryDataContainer';
import NewResearchDataContainer from '../containers/NewResearchDataContainer';

let keyCounter = 0;

class EditProjectDataComponent extends Component {
  state = {}

  doRender = () => {
    let componentArray = []
    // console.log('project', this.props.project);
    for (let section of this.props.project.section_titles){
      componentArray.push(section);
      if (section.section_title_children)
        for (let data of section.section_title_children){

          data = {...data, section_order: section.section_order}
          componentArray.push(data);
        }
    }
    return componentArray.map(e => {
      // console.log('e', e);
      try {if (!isNaN(e.child_order)) {
        if (e.type === 'Graph'){
          keyCounter++;
          e.divId = 'graph-' + e.section_title_id + '-' + e.child_order + '-' + keyCounter;
          return (<EditProjectNewGraphContainer myCall={this.props.updateData} myCallback={this.props.updateDataState} relativeUrl={`/section_title_children/${e.id}`} saveMethod={"PUT"} key={'graph-' + keyCounter} data={e} id={e.divId} />);
        } else if (e.type === 'PreliminaryDatum'){
          return (<NewPreliminaryDataContainer myCall={this.props.updateData} myCallback={this.props.updateDataState} relativeUrl={`/section_title_children/${e.id}`} saveMethod={"PUT"} key={'edit-preliminary-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'preliminary-data-' + e.section_title_id + '-' + e.child_order} />);
        } else if (e.type === 'ResearchDatum'){
          return (<NewResearchDataContainer myCall={this.props.updateData} myCallback={this.props.updateDataState} relativeUrl={`/section_title_children/${e.id}`} saveMethod={"PUT"} key={'edit-research-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'research-data-' + e.section_title_id + '-' + e.child_order} />);
        } else if (e.type === 'RandomDatum'){
          return (<NewRandomDataContainer myCall={this.props.updateData} myCallback={this.props.updateDataState} relativeUrl={`/section_title_children/${e.id}`} saveMethod={"PUT"} key={'edit-random-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'random-data-' + e.section_title_id + '-' + e.child_order} />);
        }
      } else {
        return (<EditProjectNewSectionTitleContainer myCall={this.props.updateSection} myCallback={this.props.updateSectionState} relativeUrl={`/section_titles/${e.id}`} saveMethod={"PUT"} key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'section-title-' + e.section_order} />);
      }} catch (error) {console.log(error);}
      return undefined;
    });
  }
  render(){
    return (
      <div id='edit-project-data'>
        {this.doRender()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let id = document.location.href.split('/').filter(x => x !== "").find(element => Number(element) >= 0);
  const index = state.projects.findIndex(x => x.id == id);

  return {
    project: state.projects[index]
  }
}

export default connect(mapStateToProps, { updateSectionState, updateSection, updateDataState, updateData })(EditProjectDataComponent);
