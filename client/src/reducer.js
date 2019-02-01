import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import groups from './reducers/groupsReducer';
import account from './reducers/accountReducer';

export default history => combineReducers({
  router: connectRouter(history),
  groups,
  account
});
