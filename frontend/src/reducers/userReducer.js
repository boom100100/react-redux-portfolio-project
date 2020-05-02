// TODO: adapt
export default function userReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    case 'CREATE_USER':
     return;
    case 'EDIT_USER':
      return;
    case 'DELETE_USER':
      return;

    default:
      return state;
  }
}
