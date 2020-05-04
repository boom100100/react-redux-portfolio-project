import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

export const login = (user, history) => {
  return () => {
    console.log(user);
    console.log(history);
    return sessionApi.login(user);
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
