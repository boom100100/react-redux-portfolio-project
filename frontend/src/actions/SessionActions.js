import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';
// import { persistor } from '../reducers/configureStore'
/*
all calls go to api
saves to session state
saves to user state
saves to localStorage as well, but nothing dangerous goes there
*/

export const login = (state, history, addUser, addProjects) => {
  return () => {
    return sessionApi.login(state)
      .then(response => response.json())
      .then(json => {
        doSessionSave(json, history, addUser, addProjects);
      });
  };
};

export const logout = (history, logout) => {
  return () => {
    return sessionApi.logout().then(() => {
      doSessionDelete(history, logout);
    }).catch(err => {
      throw (err);
    });
  };
};

export const doSessionSave = (json, history, addUser, addProjects) => {
  sessionService.saveSession({ id: json.id })
    .then(() => {
      sessionService.saveUser(json.id)
      .then(() => {
        if (json.email) {
          console.log('projects from doSessionSave',json.projects);
          addUser(json);
          addProjects(json.projects);

          localStorage.setItem("loggedIn", true);
          history.push('/');
          history.go(0);
        }
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}

export const doSessionDelete = (history, logout) => {
  sessionService.deleteSession().then(() => {
    sessionService.deleteUser();
    localStorage.setItem("loggedIn", false);
    logout();
    history.push('/login');
    history.go(0);
  });

}

function junk(){} export default junk;
