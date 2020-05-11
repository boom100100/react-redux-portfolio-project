import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';
import { persistor } from '../reducers/configureStore'
/*
all calls go to api
saves to session state
saves to user state
saves to localStorage as well, but nothing dangerous goes there
*/

export const login = (state, history, addUser) => {
  return () => {
    return sessionApi.login(state)
      .then(response => response.json())
      .then(json => {
        doSessionSave(json, history, addUser);
      });
  };
};

export const logout = (history, resetUser) => {
  return () => {
    return sessionApi.logout().then(() => {
      doSessionDelete(history, resetUser);
    }).catch(err => {
      throw (err);
    });
  };
};

export const doSessionSave = (json, history, addUser) => {
  sessionService.saveSession({ id: json.id })
    .then(() => {
      sessionService.saveUser(json)
      .then(() => {
        if (json.email) {
          // TODO: userReducer(json, {type: 'LOGIN_USER', user: json});
          addUser(json);
          localStorage.setItem("loggedIn", true);
          history.push('/');
          history.go(0);
        }
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}

export const doSessionDelete = (history, resetUser) => {
  sessionService.deleteSession();
  sessionService.deleteUser();
  localStorage.setItem("loggedIn", false);
  resetUser();
  persistor.flush();
  history.push('/login');
  history.go(0);
}
