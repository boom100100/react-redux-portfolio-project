import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

export const newSession = () => {
  return () => {
    return sessionApi.newSession().then(response => {
      //console.log(response);
      //console.log(response.headers);
      return response.json()});
  }

};


export const login = (state, history) => {
  return () => {
    return sessionApi.login(state).then(response => response.json()).then(json => {

      // console.log(json);

      // const cred_token = json;

      // console.log(sessionService);
      // console.log(sessionService.saveSession);
      // console.log(sessionService.saveUser);
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
