import {combineReducers} from 'redux';

import {
  PROFILE_MENU_VISIBILITY_CHANGED
} from "../constants/actionTypes";

function headerComponentReducer(state, action) {
  if (!state) {
    state = {
      isProfileMenuVisible: false
    }
  }

  switch (action.type) {
    case PROFILE_MENU_VISIBILITY_CHANGED:
      return {
        ...state,
        isProfileMenuVisible: !state.isProfileMenuVisible
      };
    default:
      return state;
  }
}

export default combineReducers({header: headerComponentReducer});
