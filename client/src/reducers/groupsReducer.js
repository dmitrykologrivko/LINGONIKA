import {combineReducers} from 'redux';

import {
  CHANGE_FROM_LANGUAGE_MENU_VISIBILITY,
  CHANGE_TO_LANGUAGE_MENU_VISIBILITY,
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
  CHANGE_CREATE_GROUP_FORM_VISIBILITY,
  CHANGE_GROUP_NAME
} from '../actions/groupsActions';

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
    case CHANGE_FROM_LANGUAGE_MENU_VISIBILITY:
      return {
        ...state,
        isFromLanguageMenuVisible: !state.isFromLanguageMenuVisible,
        isToLanguageMenuVisible: false
      };
    case CHANGE_TO_LANGUAGE_MENU_VISIBILITY:
      return {
        ...state,
        isToLanguageMenuVisible: !state.isToLanguageMenuVisible,
        isFromLanguageMenuVisible: false
      };
    case SELECT_FROM_LANGUAGE:
      return {
        ...state,
        selectedFromLanguage: action.languageCode,
        isFromLanguageMenuVisible: false
      };
    case SELECT_TO_LANGUAGE:
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
    case CHANGE_CREATE_GROUP_FORM_VISIBILITY:
      return {
        ...state,
        isCreateGroupFormVisible: !state.isCreateGroupFormVisible,
        groupName: ''
      };
    case CHANGE_GROUP_NAME:
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
