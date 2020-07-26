function projectsReducer(state = [], action){
  let newState, projectId, section_titles, section_order, section_id, child_order, allChildren, index, sectionIndex, editedData, fields, searchRegExp, replaceWith, newData, titles, section_title_index, prev_section_id, title;
  switch(action.type){
    case 'ADD_PROJECTS':
      action.projects.forEach(e => {
        e.section_titles.sort((a, b) => sorterSectionOrder(a, b)).forEach(title => title.section_title_children.sort((c, d) => sorterChildrenTitle(c, d)));

        // must convert graph content string to object
        e.section_titles.forEach(title => title.section_title_children.forEach(child => {
          if (child.type === 'Graph' && child.content){

            child.content = {graph: JSON.parse(child.content.replace(/=>/ig, ': '))};
          }
        }));

      });


      // console.log('projects after sort', action.projects);
      newState = state.concat(action.projects);
      // console.log('newState', newState);
      // console.log('action', action);
      return newState;

    case 'EDIT_PROJECT':
      //need to do deep clone of array's objects!
      newState = [];
      for (let e of state){
        //JSON-serializable content only
        // (no functions, no Number.POSITIVE_INFINITY
        newState.push(JSON.parse(JSON.stringify(e)));
      }

      projectId = action.project.id;
      index = newState.findIndex(e => e.id === projectId);

      newState[index].name = action.project.name;
      newState[index].abstract = action.project.abstract;
      return newState;

    case 'CREATE_PROJECT': //'EDIT_PROJECT', 'CREATE_PROJECT'
      newState = [...state]
      newState = newState.concat(action.project);
      return newState;

    case 'DELETE_PROJECT':
      newState = [];
      for (let e of state){
        //JSON-serializable content only
        // (no functions, no Number.POSITIVE_INFINITY
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      newState = newState.filter(x => x.id !== action.project.id);

      return newState;

    case 'ADD_SECTION':
      //need to do deep clone of array's objects!
      //otherwise, state changes and won't rerender
      // ADD_DATA has same requirement
      newState = [];
      for (let e of state){
        //JSON-serializable content only
        // (no functions, no Number.POSITIVE_INFINITY
        newState.push(JSON.parse(JSON.stringify(e)));
      }

      projectId = action.sectionTitle.project_id;

      index = newState.findIndex(x => x.id === projectId);

      let newSection = {
        description: action.sectionTitle.description,
        id: action.sectionTitle.id,
        name: action.sectionTitle.name,
        project_id: projectId,
        section_order: action.sectionTitle.section_order,
        section_title_children: []
      }
      newState[index].section_titles = newState[index].section_titles.concat(newSection);

      //and conform children to have same section_order value
      //similar function also occurs in backend
      newState[index].section_titles = levelUp(newState[index].section_titles, newSection, 'section_order');
      newState[index].section_titles = newState[index].section_titles.sort((a, b) => sortSection(a, b, 'section_order'));

      return newState;

    case 'EDIT_SECTION':
      newState = [];
      for (let e of state){
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      projectId = action.sectionTitle.project_id;
      index = newState.findIndex(x => x.id === projectId);
      sectionIndex = newState[index].section_titles.findIndex(x => x.id === action.sectionTitle.id);

      newState[index].section_titles[sectionIndex].description = action.sectionTitle.description;
      newState[index].section_titles[sectionIndex].name = action.sectionTitle.name;

      if (newState[index].section_titles[sectionIndex].section_order !== action.sectionTitle.section_order){
        // level down
        // subtract 1 from all section orders below data being edited
        section_titles = []
        for (let e of newState[index].section_titles){
          section_titles.push(JSON.parse(JSON.stringify(e)));
        }

        // return highest section_order
        // later, if action.sectionTitle.section_order is higher, use max variable for new section order instead
        // const max = section_titles.reduce(function(a, b){console.log('a.section_order', a.section_order);return Math.max(a.section_order, b.section_order)});
        // bug: must also subtract one from last or indexes can have a +1 error

        section_titles = levelDown(section_titles, section_titles[sectionIndex], 'section_order');

        // push
        // reorder the edited data
        // then, readd the edited data in new order
        // action.sectionTitle.section_order > max ? section_titles[sectionIndex].section_order = max : section_titles[sectionIndex].section_order = action.sectionTitle.section_order;
        section_titles[sectionIndex].section_order = action.sectionTitle.section_order;

        // level up
        //children will have same section_order value
        //similar function also occurs in backend
        section_titles = levelUp(section_titles, section_titles[sectionIndex], 'section_order');
        section_titles = section_titles.sort((a, b) => sortSection(a, b, 'section_order'));
        newState[index].section_titles = section_titles;
      }

      return newState;

    case 'DELETE_SECTION':
      newState = [];
      for (let e of state){
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      projectId = action.sectionTitle.project_id;
      index = newState.findIndex(x => x.id === projectId);
      sectionIndex = newState[index].section_titles.findIndex(x => x.id === action.sectionTitle.id);

      //delete the children from the store
      newState[index].section_titles[sectionIndex].section_title_children = [];

      // level down
      // subtract 1 from all section orders below data being edited
      section_titles = []
      for (let e of newState[index].section_titles){
        section_titles.push(JSON.parse(JSON.stringify(e)));
      }
      section_titles = levelDown(section_titles, section_titles[sectionIndex], 'section_order');

      // delete the indicated data
      section_titles.splice(sectionIndex, 1);
      newState[index].section_titles = section_titles;

      return newState;

    case 'ADD_DATA':
      // newState = [...state];

      //need to do deep clone of array's objects!
      //otherwise, state changes and won't rerender
      // ADD_SECTION and EDIT_DATA have same requirement
      newState = [];
      for (let e of state){
        //JSON-serializable content only
        // (no functions, no Number.POSITIVE_INFINITY
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      //extract child object
      fields = (action.data.section_title_child || action.data);

      searchRegExp = /=>/g;
      replaceWith = ':';
      if (action.data.type === 'Graph')
        fields.content = ({graph: JSON.parse(fields.content.replace(searchRegExp, replaceWith))});
      newData = {
        id: fields.id,
        project_id: action.data.project_id,
        section_title_id: fields.section_title_id,
        name: fields.name,
        child_order: fields.child_order,
        description:  fields.description,
        content: fields.content,
        type: action.data.type,
        url: fields.url,
      }

      //get section title
      projectId = action.data.project_id;
      index = newState.findIndex(x => x.id === projectId);
      section_id = action.data.section_title_child.section_title_id;
      section_order = action.data.section_order;
      child_order = action.data.child_order;

      titles = newState[index].section_titles
      section_title_index = titles.findIndex(e => e.id === newData.section_title_id);
      prev_section_id = fields.prev_section_id;
      title = titles[section_title_index]
      // console.log('title', title);
      // title.section_title_children.push(newData)

      // //add 1 to section_order equal and following sections
      //push to section title
      for (let section_title of newState[index].section_titles){
        section_title.section_title_children = section_title.section_title_children.filter(element => element.id !== action.data.delete_id);
      }
      // newState[projectId].section_titles[prev_section_id].section_title_children = newState[projectId].section_titles[prev_section_id].section_title_children.filter(element => element.id !== action.data.delete_id);
      newState[index].section_titles[section_title_index].section_title_children.push(newData)

      //reorder following children
      newState[index].section_titles[section_title_index].section_title_children = levelUp(newState[index].section_titles[section_title_index].section_title_children, newData, 'child_order');
      // console.log('allChildren before sort', allChildren);

      //sort sections
      newState[index].section_titles[section_title_index].section_title_children = newState[index].section_titles[section_title_index].section_title_children.sort((a, b) => sortSection(a, b, 'child_order'));
      // console.log('allChildren after sort', allChildren);
      return newState;

    case 'EDIT_DATA':
      newState = [];
      for (let e of state){
        //JSON-serializable content only
        // (no functions, no Number.POSITIVE_INFINITY
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      //extract child object
      fields = (action.data.section_title_child || action.data);

      searchRegExp = /=>/g;
      replaceWith = ':';
      if (action.data.type === 'Graph')
        fields.content = ({graph: JSON.parse(fields.content.replace(searchRegExp, replaceWith))});
      newData = {
        id: fields.id,
        project_id: action.data.project_id,
        section_title_id: fields.section_title_id,
        name: fields.name,
        child_order: fields.child_order,
        description:  fields.description,
        content: fields.content,
        type: action.data.type,
        url: fields.url,
      }


      //get section title
      projectId = action.data.project_id;
      index = newState.findIndex(x => x.id === projectId);
      section_id = action.data.section_title_child.section_title_id;
      section_order = action.data.section_order;
      child_order = action.data.child_order;

      titles = newState[index].section_titles
      section_title_index = titles.findIndex(e => e.id === newData.section_title_id);
      prev_section_id = fields.prev_section_id;
      title = titles[section_title_index]
      // console.log('title', title);
      // title.section_title_children.push(newData)

      // //add 1 to section_order equal and following sections
      //push to section title
      let prevChildOrder;
      for (let section_title of newState[index].section_titles){
        section_title.section_title_children = section_title.section_title_children.filter(element => {
          if (element.id === action.data.delete_id){
            prevChildOrder = element.child_order;
          }
            // console.log('prevChildOrder', prevChildOrder);
          return element.id !== action.data.delete_id;
        });
      }
      // newState[projectId].section_titles[prev_section_id].section_title_children = newState[projectId].section_titles[prev_section_id].section_title_children.filter(element => element.id !== action.data.delete_id);
      // console.log('newData', newData);
      // console.log('before newState[index].section_titles[section_title_index].section_title_children', newState[index].section_titles[section_title_index].section_title_children);
      newState[index].section_titles[section_title_index].section_title_children.push(newData);

      // TODO:
      // graph wouldn't edit in good order
      // child_order figures mess up
      // Moving data between sections is not smooth
      // prev doesn't update
      //

      //reorder following children
      // if moving down
      if (action.movingDown){
        newState[index].section_titles[section_title_index].section_title_children = levelLowers(newState[index].section_titles[section_title_index].section_title_children, newData, 'child_order', prevChildOrder);
      } else {
        newState[index].section_titles[section_title_index].section_title_children = levelUpAlt(newState[index].section_titles[section_title_index].section_title_children, newData, 'child_order', prevChildOrder);
      }
      // console.log('allChildren before sort', allChildren);

      //sort sections
      newState[index].section_titles[section_title_index].section_title_children = newState[index].section_titles[section_title_index].section_title_children.sort((a, b) => sortSection(a, b, 'child_order'));
      // console.log('allChildren after sort', allChildren);
      // console.log('after newState[index].section_titles[section_title_index].section_title_children', newState[index].section_titles[section_title_index].section_title_children);
      return newState;

    case 'DELETE_DATA':
      newState = [];
      for (let e of state){
        newState.push(JSON.parse(JSON.stringify(e)));
      }
      console.log('action.data', action.data);
      console.log('action.data.project_id', action.data.project_id);
      projectId = action.data.project_id;
      index = newState.findIndex(x => x.id === projectId);
      sectionIndex = newState[index].section_titles.findIndex(x => x.id === action.data.section_title_child.section_title_id);
      let section_title_children = newState[index].section_titles[sectionIndex].section_title_children;
      const childIndex = section_title_children.findIndex(e => e.id === action.data.section_title_child.id);

      // level down
      // subtract 1 from all section orders below data being edited
      section_title_children = levelDown(section_title_children, section_title_children[childIndex], 'child_order');

      //delete the child
      section_title_children = section_title_children.filter(e => e.id !== action.data.section_title_child.id);

      // delete the indicated data
      newState[index].section_titles[sectionIndex].section_title_children = section_title_children;

      return newState;


    default:
      return state;
  }
}

//array, elementArg, key
const levelUp = (array, elementArg, key, prevChildOrder) => {
  return array.map(e => {
    // if (prevChildOrder > e[key] && e[key] >= elementArg[key] && elementArg !== e){
    if (e[key] >= elementArg[key] && elementArg !== e){
      e[key]++
      if (key === 'section_order')
        e.section_title_children.forEach(child => child.section_order++ );
    }
    return e;
  });
}

const levelUpAlt = (array, elementArg, key, prevChildOrder) => {
  return array.map(e => {
    if (prevChildOrder > e[key] && e[key] >= elementArg[key] && elementArg !== e){
    // if (e[key] >= elementArg[key] && elementArg !== e){
      e[key]++
      if (key === 'section_order')
        e.section_title_children.forEach(child => child.section_order++ );
    }
    return e;
  });
}

const levelDown = (array, elementArg, key) => {
  return array.map(e => {
    if (e[key] >= elementArg[key] && elementArg !== e){
      e[key]--
      if (key === 'section_order')
        e.section_title_children.forEach(child => child.section_order-- );
    }
    return e;
  });
}

const levelLowers = (array, elementArg, key, prevChildOrder) => {
  return array.map(e => {
    if (prevChildOrder < e[key] && e[key] <= elementArg[key] && elementArg !== e){
      e[key]--
    }
    return e;
  });
}

const sorterChildrenTitle = (a, b) => {
  //sorts children, puts section titles first
  if (a.section_order === b.section_order && a.child_order && b.child_order){
    if (a.child_order < b.child_order){
        return -1;
    } else if (b.child_order < a.child_order) {
        return 1;
    }
  } else if (a.section_order === b.section_order && !a.child_order && b.child_order) {
    return -1
  } else if (a.section_order === b.section_order && a.child_order && !b.child_order) {
    return 1
  }
  return 0;
}

const sorterSectionOrder = (a, b) => {
  //sorts all incompletely

  //SectionTitle: id, section_order
  //SectionTitleChild: section_title_id, child_order

  //lowest section_order first
  if (a.section_order < b.section_order) {
      return -1;
  } else if (b.section_order < a.section_order) {
      return 1;
  }
  return 0
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
