import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import groups from './reducers/groupsReducer';

export default history => combineReducers({
  router: connectRouter(history),
  groups
});
