import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
//import sessionReducer from './reducers/sessionReducer.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { sessionService } from 'redux-react-session';

import { Provider } from 'react-redux';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);

const store = createStore(reducer, applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//store.dispatch({ type: '@@INIT' });
sessionService.initSessionService(store);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
