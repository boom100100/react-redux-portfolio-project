export default function projectReducer(state = {count: 0}, action){
  switch(action.type){
    case 'NEW_PROJECT':
      return {...state};
  }
}
