import React from 'react';
import EditProjectNewSectionTitleContainer from '../EditProjectNewSectionTitleContainer';
import EditProjectNewGraphContainer from '../EditProjectNewGraphContainer';
import NewRandomDataContainer from '../NewRandomDataContainer';
import NewPreliminaryDataContainer from '../NewPreliminaryDataContainer';
import NewResearchDataContainer from '../NewResearchDataContainer';

//manages displaying elements
//and adding divs to show store and fetch data

let keyCounter = 0;
export const modifyElements = (project) => {
  document.getElementById('edit-project-parent').firstElementChild.style.display = 'none';
  let edit = document.getElementById('edit-project-data');
  edit.innerHTML = '';
  let componentArray = []

  for (let section of project.section_titles){
    componentArray.push(section)
    // console.log('section.section_title_children', section.section_title_children);
    if (section.section_title_children)
      for (let data of section.section_title_children){
        componentArray.push(data)
        // console.log('pushing data', data);
      }
  }

  componentArray.sort((a, b) => sorter(a, b));

  return componentArray.map(e => {
    console.log('e', e);
    if (!isNaN(e.child_order)) {
      if (e.type === 'Graph'){
        // console.log('is graph', e);
        return (<EditProjectNewGraphContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'graph-' + e.section_order + '-' + e.child_order} />);
      } else if (e.type === 'PreliminaryDatum'){
        // console.log('is prelim', e);
        return (<NewPreliminaryDataContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'preliminary-data-' + e.section_order + '-' + e.child_order} />);
      } else if (e.type === 'ResearchDatum'){
        // console.log('is research', e);
        return (<NewResearchDataContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'research-data-' + e.section_order + '-' + e.child_order} />);
      } else if (e.type === 'RandomDatum'){
        // console.log('is random', e);
        return (<NewRandomDataContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'random-data-' + e.section_order + '-' + e.child_order} />);
      }
    } else {
      // console.log('is section title', e);
      return (<EditProjectNewSectionTitleContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'section-title-' + e.section_order} />);
    }
  });
}

const sorter = (a, b) => {
  //SectionTitle: id, section_order
  //SectionTitleChild: section_title_id, child_order

  // if comparing ST and ST
  // put lower section_order first
  if (a.id && b.id){
    if (a.section_order < b.section_order) {
        return -1;
    } else if (b.section_order < a.section_order) {
        return 1;
    }
    return 0;
  }




  // if comparing Child and Child
  // if section_order === section_order
  // put lower child_order first
  else if (a.child_order && b.child_order){
    if (a.section_order === b.section_order)
      if (a.child_order < b.child_order) {
          return -1;
      } else if (b.child_order < a.child_order) {
          return 1;
      }
    return 0;
  }


  //if comparing ST and Child
  //put ST first if ST section_order >= Child section_order
  else if ((a.id && b.child_order) || (a.child_order && b.id)){
    if (a.section_order < b.section_order) {
        return -1;
    } else if (b.section_order <= a.section_order) {
        return 1;
    }
    return 0;
  } else if (a.child_order && b.id) {
    if (b.section_order < a.section_order) {
        return -1;
    }
    if (a.section_order <= b.section_order) {
        return 1;
    }
    return 0;
  }

  // a.key.split('-')[1]
  // a.key.split('-')[2]

}


export const addSectionTitle = () => {
  document.getElementById('add-new-section-title').style.display = 'block';

  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'none';

}

export const hideNewCreators = () => {
  document.getElementById('add-new-section-title').style.display = 'none';
  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'none';
}
export const showAddDataOptions = () => {
  document.getElementById('primary-links').style.display = 'none';
  hideNewCreators();

  document.getElementById('secondary-links').style.display = 'block';

}

export const showPrimaryOptions = () => {
  document.getElementById('primary-links').style.display = 'block';

  document.getElementById('secondary-links').style.display = 'none';
  hideNewCreators();
}

export const showResearchContainer = () => {
  hideNewCreators();
  document.getElementById('add-new-research').style.display = 'block';
}

export const addResearchData = () => {
  showResearchContainer();
  document.getElementById('add-new-research-data').style.display = 'block';

  document.getElementById('add-new-random-data').style.display = 'none';
  document.getElementById('add-new-preliminary-data').style.display = 'none';

}
export const addPreliminaryData = () => {
  showResearchContainer();
  document.getElementById('add-new-preliminary-data').style.display = 'block';

  document.getElementById('add-new-random-data').style.display = 'none';
  document.getElementById('add-new-research-data').style.display = 'none';

}
export const addRandomData = () => {
  showResearchContainer();
  document.getElementById('add-new-random-data').style.display = 'block';

  document.getElementById('add-new-preliminary-data').style.display = 'none';
  document.getElementById('add-new-research-data').style.display = 'none';

}
export const addGraph = () => {
  document.getElementById('add-new-section-title').style.display = 'none';
  document.getElementById('add-new-research').style.display = 'none';
  document.getElementById('add-new-graph').style.display = 'block';

}
