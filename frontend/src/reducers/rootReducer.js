import { combineReducers } from 'redux';

import { sessionReducer } from 'redux-react-session';
import userReducer from './userReducer.js';
import projectsReducer from './projectsReducer.js';
import storage from 'redux-persist/lib/storage';

const reducers = {

  session: sessionReducer,
  user: userReducer,
  projects: projectsReducer,
};

const appReducer = combineReducers(reducers);


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action)
}

export default rootReducer;
