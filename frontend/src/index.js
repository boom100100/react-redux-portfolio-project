import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { store, persistor } from './reducers/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

// import rootReducer from './reducers/rootReducer.js';
//
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';


import { Provider } from 'react-redux';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

// console.log(store);
// console.log(persistor);
// sessionService.initSessionService(store);


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
