function projectsReducer(state = [], action){
  switch(action.type){
    case 'ADD_PROJECTS':
      console.log('projects from reducer', action.projects);
      console.log('new state check', state.concat(action.projects));
      return state.concat(action.projects);

    case 'RESET_PROJECTS':
      console.log('resetting projects in reducer.');
      return [];

    case 'REPLACE_PROJECTS':
      return action.projects;

    case 'NEW_PROJECT':
      return [...state, action.projects];

    case 'DELETE_PROJECT':
      return [...state];

    case 'ADD_SECTION':
      let newState = [...state];
      const projectId = action.sectionTitle.project_id - 1;
      newState[projectId].section_titles.push(action.sectionTitle);
      console.log('action', action);
      let section_titles = newState[projectId].section_titles;
      console.log('section_titles', section_titles);

      //add 1 to equal and following sections
      section_titles = levelUp(section_titles, action.sectionTitle);
      console.log('section_titles before sort', section_titles);

      //sort data
      newState[projectId].section_titles = section_titles.sort((a, b) => sortSection(a, b));
      console.log('section_titles after sort', section_titles);
      return newState;

    default:
      return state;
  }
}

const levelUp = (section_titles, sectionTitle) => {
  console.log(sectionTitle.section_order);
  return section_titles.map((e) => {
    if (e.section_order >= sectionTitle.section_order && sectionTitle !== e)
      e.section_order = e.section_order + 1

    return e;
  });
}

const sortSection = (a, b) => {
  if (a.section_order < b.section_order) {
        return -1;
    }
    if (b.section_order < a.section_order) {
        return 1;
    }
    return 0;
}

export default projectsReducer;
