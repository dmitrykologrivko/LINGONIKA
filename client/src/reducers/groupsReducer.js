import {combineReducers} from 'redux';

import {
  FROM_LANGUAGE_MENU_VISIBILITY_CHANGED,
  TO_LANGUAGE_MENU_VISIBILITY_CHANGED,
  SELECTED_FROM_LANGUAGE_CHANGED,
  SELECTED_TO_LANGUAGE_CHANGED,
  CREATE_GROUP_FORM_VISIBILITY_CHANGED,
  GROUP_NAME_CHANGED
} from '../constants/actionTypes';

function meta(state, action) {
  if (!state) {
    // TODO: Temp solution
    state = {
      languages: {
        'ru': 'Russian',
        'en': 'English'
      },
      countLearnedWords: 0
    }
  }

  return state;
}

function groupsHeader(state, action) {
  if (!state) {
    // TODO: Temp solution
    state = {
      selectedFromLanguage: 'ru',
      selectedToLanguage: 'en',
      isFromLanguageMenuVisible: false,
      isToLanguageMenuVisible: false,
    }
  }

  switch (action.type) {
    case FROM_LANGUAGE_MENU_VISIBILITY_CHANGED:
      return {
        ...state,
        isFromLanguageMenuVisible: !state.isFromLanguageMenuVisible,
        isToLanguageMenuVisible: false
      };
    case TO_LANGUAGE_MENU_VISIBILITY_CHANGED:
      return {
        ...state,
        isToLanguageMenuVisible: !state.isToLanguageMenuVisible,
        isFromLanguageMenuVisible: false
      };
    case SELECTED_FROM_LANGUAGE_CHANGED:
      return {
        ...state,
        selectedFromLanguage: action.languageCode,
        isFromLanguageMenuVisible: false
      };
    case SELECTED_TO_LANGUAGE_CHANGED:
      return {
        ...state,
        selectedToLanguage: action.languageCode,
        isToLanguageMenuVisible: false
      };
    default:
      return state;
  }
}

function createGroupBox(state, action) {
  if (!state) {
    state = {
      isCreateGroupFormVisible: false,
      groupName: ''
    }
  }

  switch (action.type) {
    case CREATE_GROUP_FORM_VISIBILITY_CHANGED:
      return {
        ...state,
        isCreateGroupFormVisible: !state.isCreateGroupFormVisible,
        groupName: ''
      };
    case GROUP_NAME_CHANGED:
      return {
        ...state,
        groupName: action.groupName
      };
    default:
      return state;
  }
}

export default combineReducers({
  meta,
  groupsHeader,
  createGroupBox
});
