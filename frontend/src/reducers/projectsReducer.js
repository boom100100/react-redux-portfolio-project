function projectsReducer(state = [], action){
  let newState;
  let projectId;
  let section_titles;
  let section_order;
  let section_id;
  let child_order;
  let allChildren;
  switch(action.type){
    case 'ADD_PROJECTS':
      // console.log('projects from reducer', action.projects);
      // console.log('new state check', state.concat(action.projects));
      return state.concat(action.projects);

    case 'RESET_PROJECTS':
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
      let newSection = {
        id: action.sectionTitle.id,
        name: action.sectionTitle.name,
        project_id: projectId,
        section_order: action.sectionTitle.section_order,
        section_title_children: []
      }
      newState[projectId].section_titles.push(newSection);

      //add 1 to section_order following sections
      //and conform children to have same section_order value
      //similar function also occurs in backend

      newState[projectId].section_titles = levelUp(newState[projectId].section_titles, newSection, 'section_order');

      //sort sections
      newState[projectId].section_titles = newState[projectId].section_titles.sort((a, b) => sortSection(a, b, 'section_order'));

      return newState;

    case 'ADD_DATA':
      newState = [...state];
      //extract child object
      console.log('action', action);
      let fields = action.data.section_title_child;
      console.log('fields,fields.graph,fields.type', fields,fields.graph,fields.type);
      const searchRegExp = /=>/g;
      const replaceWith = ':';
      const newData = {
        id: fields.id,
        project_id: action.data.project_id,
        section_title_id: fields.section_title_id,
        name: fields.name,
        child_order: fields.child_order,
        description:  fields.description,
        content: {graph: JSON.parse(fields.content.replace(searchRegExp, replaceWith))},
        type: fields.type,
        url: fields.url,
      }

      //get section title
      projectId = action.data.project_id - 1;
      section_id = action.data.section_title_child.section_title_id;
      section_order = action.data.section_order;
      child_order = action.data.child_order;

      let titles = newState[projectId].section_titles
      let section_title_index = titles.findIndex(e => e.id === fields.section_title_id);
      let title = titles[section_title_index]
      console.log('title', title);
      // title.section_title_children.push(newData)

      console.log('newState', newState);


      // //add 1 to section_order equal and following sections
      //push to section title
      console.log('newState[projectId].section_titles[section_title_index]', newState[projectId].section_titles[section_title_index]);
      console.log('newState[projectId].section_titles[section_title_index].section_title_children', newState[projectId].section_titles[section_title_index].section_title_children);
      console.log();
      newState[projectId].section_titles[section_title_index].section_title_children.push(newData)

      //reorder following children
      newState[projectId].section_titles[section_title_index].section_title_children = levelUp(newState[projectId].section_titles[section_title_index].section_title_children, newData, 'child_order');
      // console.log('allChildren before sort', allChildren);

      //sort sections
      newState[projectId].section_titles[section_title_index].section_title_children = newState[projectId].section_titles[section_title_index].section_title_children.sort((a, b) => sortSection(a, b, 'child_order'));
      // console.log('allChildren after sort', allChildren);
      return newState;

      case 'SAVE_PROJECT':
        return state;

    default:
      return state;
  }
}

//array, elementArg, key
const levelUp = (array, elementArg, key) => {
  console.log('elementArg[key]', elementArg[key]);
  console.log('array', array);
  return array.map((e) => {
    if (e[key] >= elementArg[key] && elementArg !== e){
      e[key]++
      if (key === 'section_order')
        e.section_title_children.forEach(child => child.section_order++ );
    }
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
