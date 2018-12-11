import {combineReducers} from 'redux';

import {
  CHANGE_FROM_LANGUAGE_MENU_VISIBILITY,
  CHANGE_TO_LANGUAGE_MENU_VISIBILITY,
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
  CHANGE_CREATE_GROUP_FORM_VISIBILITY,
  CHANGE_CREATABLE_GROUP_NAME
} from '../actions/groupsActions';

function groupsMetaReducer(state, action) {
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

function groupsHeaderReducer(state, action) {
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

function createGroupBoxReducer(state, action) {
  if (!state) {
    state = {
      isCreateGroupFormVisible: false,
      creatableGroupName: ''
    }
  }

  switch (action.type) {
    case CHANGE_CREATE_GROUP_FORM_VISIBILITY:
      return {
        ...state,
        isCreateGroupFormVisible: !state.isCreateGroupFormVisible,
        creatableGroupName: ''
      };
    case CHANGE_CREATABLE_GROUP_NAME:
      return {
        ...state,
        creatableGroupName: action.creatableGroupName
      };
    default:
      return state;
  }
}

export default combineReducers({
  groupsMeta: groupsMetaReducer,
  groupsHeader: groupsHeaderReducer,
  createGroupBox: createGroupBoxReducer
});
