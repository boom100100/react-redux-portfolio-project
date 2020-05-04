export default function sessionReducer(state = { email: '', password: '' }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    case 'LOG_IN':
      //fetch login flow
      //set session values
      // TODO: thunk fetch session, modify state
      console.log("Logging in.");
      console.log(action.state);
      return {...state};
    case 'LOG_OUT':
      console.log("Logging out.")
      return state;


    default:
      return state;
  }
}
