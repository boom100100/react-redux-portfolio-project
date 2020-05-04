import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

export const newSession = (setStateFunction, state) => {
  return () => {
    return sessionApi.newSession().then(response => response.json());
  }

};


export const login = (state, token, history) => {
  return () => {
    return sessionApi.login(state, token).then(response => response.json()).then(json => {
      // TODO: is this secure way to store token?

      //json includes token from server
      const { cred_token } = json;

      sessionService.saveSession({ cred_token })
      .then(() => {

        sessionService.saveUser(json.data)
        .then(() => {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("user", JSON.stringify(json.data.user));
          history.push('/');
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
      history.push('/login');
    }).catch(err => {
      throw (err);
    });
  };
};
