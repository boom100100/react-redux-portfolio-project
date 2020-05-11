import * as userApi from '../api/UserApi';
import { sessionService } from 'redux-react-session';
import { persistor } from '../reducers/configureStore';
import { logout, doSessionSave } from '../actions/SessionActions';

export const addUser = (user) => {
  //console.log(user);
  // debugger;
  const action = {type: 'ADD_USER', user };
  console.log("Action is");
  console.log((action));
  return action;
}

export const resetUser = () => {
  const action = {type: 'RESET_USER' };
  console.log(action);
  return action;
}

export const createUser = (state, history, addUser) => {

  return () => {
    return userApi.createUser(state)
      .then(response => response.json())
      .then(json => {
        doSessionSave(json, history, addUser);
        }).catch(error => console.log(error));
  }
}




export const updateUser = (state, history, updateUserState) => {

  return () => {
    return userApi.updateUser(state)
      .then(response => response.json())
      .then(json => {
        if (json.email) {
          console.log(json);
          updateUserState(json);
          history.push('/profile');
          history.go(0);
        }
      })
      .catch(err => console.error(err));
  }
}
export const updateUserState = (user) => {
  const action = {type: 'EDIT_USER', user };
  return action;
}


export const deleteUser = (state, history, logout, resetUser) => {
  return () => {
    return userApi.deleteUser(state)
      .then(response => {

        if (response.ok) {
          console.log(response);
          logout(history, resetUser);
          // TODO: fix history
          history.push('/profile');
          history.go(0);
        }
      })
      .catch(err => console.error(err));
  }
}
