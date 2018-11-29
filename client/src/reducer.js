import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import header from './reducers/headerReducer';
import groups from './reducers/groupsReducer';

export default history => combineReducers({
  router: connectRouter(history),
  header,
  groups
});
