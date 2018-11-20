import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import header from './reducers/headerReducer';

export default history => combineReducers({
  router: connectRouter(history),
  header
});
