import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import combineReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['audioPlayerReducer', 'sceneReducer']
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
