import { combineReducers } from 'redux';

import { sessionReducer } from 'redux-react-session';
import userReducer from './userReducer.js';

const reducers = {
  user: userReducer,
  session: sessionReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
