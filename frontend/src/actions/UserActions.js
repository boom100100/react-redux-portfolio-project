import * as userApi from '../api/UserApi';
import { sessionService } from 'redux-react-session';

export const addUser = (user) => {
  //console.log(user);
  // debugger;
  const action = {type: 'ADD_USER', user: {email: user.email, projects: user.projects} };
  console.log("Action is");
  console.log((action));
  return action;
}

export const resetUser = () => {
  const action = {type: 'RESET_USER', user: {email: '', projects: []} };
  console.log((action));
  return action;
}

export const createUser = (state, history) => {

  return () => {
    return userApi.createUser(state)
      .then(response => response.json())
      .then(json => {

        sessionService.saveSession({ json })
          .then(() => {

            sessionService.saveUser(json)
            .then(() => {
              if (json) {
                // TODO: userReducer(json, {type: 'LOGIN_USER', user: json});
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("user", JSON.stringify(json.user));
                history.push('/');
                history.go(0);
              }
            }).catch(err => console.error(err));
          }).catch(err => console.error(err));


      }).catch(error => console.log(error));
  }
}


export const editUser = (state) => {
  return {
    type: 'EDIT_USER',
    state: state
  };
};


export const deleteUser = (state) => {
  return {
    type: 'DELETE_USER',
    state: state
  };
};
