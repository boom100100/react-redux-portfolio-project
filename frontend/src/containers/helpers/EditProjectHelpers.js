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
  // console.log('project', project);

  for (let section of project.section_titles){
    // console.log('section', section);
    componentArray.push(section);
    // console.log('section.section_title_children', section.section_title_children);
    if (section.section_title_children)
      for (let data of section.section_title_children){
        componentArray.push(data)
        // console.log('pushing data', data);
      }
  }

  // componentArray.sort((a, b) => sorterSectionOrder(a, b)).sort((a, b) => sorterChildrenTitle(a, b));

  return componentArray.map(e => {
    // console.log('e', e);
    if (!isNaN(e.child_order)) {
      if (e.type === 'Graph'){
        // console.log('is graph', e);
        keyCounter++;
        e.id = 'graph-' + e.section_title_id + '-' + e.child_order + keyCounter;
        return (<EditProjectNewGraphContainer key={'graph-' + keyCounter} data={e} id={e.id} />);
      } else if (e.type === 'PreliminaryDatum'){
        // console.log('is prelim', e);
        return (<NewPreliminaryDataContainer key={'edit-preliminary-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'preliminary-data-' + e.section_title_id + '-' + e.child_order} />);
      } else if (e.type === 'ResearchDatum'){
        // console.log('is research', e);
        return (<NewResearchDataContainer key={'edit-research-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'research-data-' + e.section_title_id + '-' + e.child_order} />);
      } else if (e.type === 'RandomDatum'){
        // console.log('is random', e);
        return (<NewRandomDataContainer key={'edit-random-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'random-data-' + e.section_title_id + '-' + e.child_order} />);
      }
    } else {
      // console.log('is section title', e);
      return (<EditProjectNewSectionTitleContainer key={'graph-' + e.section_order + '-' + e.child_order + '-' + ++keyCounter} data={e} id={'section-title-' + e.section_order} />);
    }
  });
}


// const sorterChildrenTitle = (a, b) => {
//   //sorts children, puts section titles first
//   if (a.section_order === b.section_order && a.child_order && b.child_order){
//     if (a.child_order < b.child_order){
//         return -1;
//     } else if (b.child_order < a.child_order) {
//         return 1;
//     }
//   } else if (a.section_order === b.section_order && !a.child_order && b.child_order) {
//     return 1
//   } else if (a.section_order === b.section_order && a.child_order && !b.child_order) {
//     return -1
//   }
//   return 0;
// }
//
// const sorterSectionOrder = (a, b) => {
//   //sorts all incompletely
//
//   //SectionTitle: id, section_order
//   //SectionTitleChild: section_title_id, child_order
//
//   //lowest section_order first
//   if (a.section_order < b.section_order) {
//       return -1;
//   } else if (b.section_order < a.section_order) {
//       return 1;
//   }
//   return 0
// }


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
