import {
  PROFILE_MENU_VISIBILITY_CHANGED
} from "../constants/actionTypes";

const initialState = {
  isProfileMenuVisible: false
};

export default (state = initialState, action) => {
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
