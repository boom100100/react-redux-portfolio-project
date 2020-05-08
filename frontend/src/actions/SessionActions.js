import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

/*
all calls go to api
saves to store
saves to localStorage as well, but nothing dangerous goes there
*/

export const login = (state, history, addUser) => {
  return () => {
    return sessionApi.login(state).then(response => response.json()).then(json => {

      // console.log(json);

      // const cred_token = json;

      // console.log(sessionService);
      // console.log(sessionService.saveSession);
      // console.log(sessionService.saveUser);
      sessionService.saveSession({ json })
      .then(() => {

        sessionService.saveUser(json)
        .then(() => {
          if (json.email) {
            console.log(state);
            console.log(json);

            addUser(json);
            //dispatch(addUser(json));
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("user", JSON.stringify(json.email));
            history.push('/');
            //history.go(0);
          }
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    });
  };
};

export const logout = (history) => {
  return () => {
    return sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      localStorage.clear("loggedIn");
      localStorage.clear("user");
      history.push('/login');
      history.go(0);
    }).catch(err => {
      throw (err);
    });
  };
};
