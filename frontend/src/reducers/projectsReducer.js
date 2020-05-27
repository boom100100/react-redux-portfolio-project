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
      return newState;

    default:
      return state;
  }
}

export default projectsReducer;
