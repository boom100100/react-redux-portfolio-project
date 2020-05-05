import * as userApi from '../api/UserApi';
import * as sessionApi from '../api/SessionApi';
import { sessionService } from 'redux-react-session';

export const createUser = (state, history) => {

  return () => {
    return userApi.createUser(state)
      .then(response => response.json())
      .then(json => {

        sessionService.saveSession({ json })
        .then(() => {

          sessionService.saveUser(json.data)
          .then(() => {
            if (json.data) {
              localStorage.setItem("loggedIn", true);
              localStorage.setItem("user", JSON.stringify(json.data.user));
              history.push('/');
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
