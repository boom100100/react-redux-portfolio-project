function userReducer(state = {email: ''}, action) {
  //debugger;
  switch (action.type) {
    case "ADD_USER":
      // console.log(state);
      let newState = {email: action.user.email};
      // console.log("Doing ADD_USER.");
      // console.log(newState);
      // newState = state.set('projects', action.user.projects);
      return newState;


    case 'RESET_USER':
      let newState2 = {email: ''};
      // console.log("Doing RESET_USER.");
      return newState2;

     case 'EDIT_USER':
      // console.log("Doing EDIT_USER.");
      // console.log(action.user.email);
      return {email: action.user.email};



    default:
      //always returns default
      // console.log("Doing default.");
      // console.log(state);
      return state;
  }
}

export default userReducer;
