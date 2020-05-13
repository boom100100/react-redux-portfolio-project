import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { sessionService } from 'redux-react-session';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
sessionService.initSessionService(store);
export const persistor = persistStore(store);
