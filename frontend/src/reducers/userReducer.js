// import { connect } from 'react-redux';

// let state;
// function dispatch(action){
//   userReducer(state, action);
// }

function userReducer(state = { email: '', projects: [] }, action) {
  //debugger;
  switch (action.type) {
    case "ADD_USER":
      console.log(state);
      let newState = {email: action.user.email, projects: action.user.projects};
      console.log("Doing ADD_USER.");
      console.log(newState);
      // newState = state.set('projects', action.user.projects);
      return newState;
      

    case 'RESET_USER':
    console.log("Doing RESET_USER.");
      return ({ email: '', projects: [] });

    case 'LOGOUT_USER':
       return state;

     case 'EDIT_USER':
       return state;

    case 'DELETE_USER':
      return ({ email: '', projects: [] });

    default:
      //always returns default
      console.log("Doing default.");
      console.log(state);
      return state;
  }
}

// function createStore(reducer){
//   let state;
//   function dispatch(){
//     state = reducer(state, {type: '@@INIT'});
//   }
//   function getState(){
//     return state;
//   }
//
//   return { dispatch, getState }
// }

// store = createStore(userReducer);

// const mapStateToProps = function(state) {
//   return {
//     state: state.user
//   }
// }
// export default connect(mapStateToProps)(userReducer);
export default userReducer;
