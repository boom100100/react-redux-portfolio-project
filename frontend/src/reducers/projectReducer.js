export default function projectReducer(state = [], action){
  switch(action.type){
    case 'REPLACE_PROJECTS':
      return action.projects;

    case 'NEW_PROJECT':
      return [...state, action.projects];
      
    default:
      return state;
  }
}

export default projectReducer;
