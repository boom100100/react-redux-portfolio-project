// TODO: adapt
export default function userReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'CREATE_USER':
     return {...state};
    case 'EDIT_USER':
      return {...state};
    case 'DELETE_USER':
      return {...state};

    default:
      return state;
  }
}
