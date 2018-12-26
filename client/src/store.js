import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './reducer';

export default history => createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      createSagaMiddleware()
    )
  )
);
