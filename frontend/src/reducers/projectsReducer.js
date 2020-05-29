function projectsReducer(state = [], action){
  let newState;
  let projectId;
  let section_titles;
  let section_order;
  let child_order;
  let allChildren;
  switch(action.type){
    case 'ADD_PROJECTS':
      // console.log('projects from reducer', action.projects);
      // console.log('new state check', state.concat(action.projects));
      return state.concat(action.projects);

    case 'RESET_PROJECTS':
      // console.log('resetting projects in reducer.');
      return [];

    case 'REPLACE_PROJECTS':
      return action.projects;

    case 'NEW_PROJECT':
      return [...state, action.projects];

    case 'DELETE_PROJECT':
      return [...state];

    case 'ADD_SECTION':
      newState = [...state];
      projectId = action.sectionTitle.project_id - 1;
      newState[projectId].section_titles.push(action.sectionTitle);

      section_titles = newState[projectId].section_titles;

      //add 1 to section_order equal and following sections
      section_titles = levelUp(section_titles, action.sectionTitle, 'section_order');

      //sort sections
      newState[projectId].section_titles = section_titles.sort((a, b) => sortSection(a, b, 'section_order'));
      return newState;

      case 'ADD_DATA':
        newState = [...state];
        projectId = action.data.project_id - 1;
        section_order = action.data.section_order;
        allChildren = newState[projectId].section_titles[section_order].section_title_children;


        child_order = action.data.child_order;

        console.log('ADD_DATA action', action);
        console.log('newState', newState);
        //get project
        console.log('newState[projectId].section_titles[section_order]', newState[projectId].section_titles[section_order]);
        console.log('newState[projectId].section_titles[section_order].section_title_children', newState[projectId].section_titles[section_order].section_title_children);
        console.log('action.data', action.data);

        newState[projectId].section_titles[section_order].section_title_children.push(action.data);

        // //add 1 to section_order equal and following sections
        newState[projectId].section_titles[section_order].section_title_children = levelUp(newState[projectId].section_titles[section_order].section_title_children, action.data, 'child_order');
        console.log('allChildren before sort', allChildren);

        //sort sections
        newState[projectId].section_titles[section_order].section_title_children = newState[projectId].section_titles[section_order].section_title_children.sort((a, b) => sortSection(a, b, 'child_order'));
        console.log('allChildren after sort', allChildren);
        return newState;

    default:
      return state;
  }
}

//array, elementArg, key
const levelUp = (array, elementArg, key) => {
  console.log(elementArg[key]);
  return array.map((e) => {
    if (e[key] >= elementArg[key] && elementArg !== e)
      e[key] = e[key] + 1

    return e;
  });
}

const sortSection = (a, b, key) => {
  if (a[key] < b[key]) {
        return -1;
    }
    if (b[key] < a[key]) {
        return 1;
    }
    return 0;
}

export default projectsReducer;
