import {combineReducers} from 'redux';

import {CHANGE_PROFILE_MENU_VISIBILITY} from '../actions/appActions';

function headerReducer(state, action) {
  if (!state) {
    state = {
      isProfileMenuVisible: false
    }
  }

  switch (action.type) {
    case CHANGE_PROFILE_MENU_VISIBILITY:
      return {
        ...state,
        isProfileMenuVisible: !state.isProfileMenuVisible
      };
    default:
      return state;
  }
}

export default combineReducers({header: headerReducer});
