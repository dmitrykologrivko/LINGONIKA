import {
  FROM_LANGUAGE_MENU_VISIBILITY_CHANGED,
  TO_LANGUAGE_MENU_VISIBILITY_CHANGED,
  SELECTED_FROM_LANGUAGE_CHANGED,
  SELECTED_TO_LANGUAGE_CHANGED,
  CREATE_GROUP_FORM_VISIBILITY_CHANGED,
  GROUP_NAME_CHANGED
} from '../constants/actionTypes';

// TODO: Temp solution
const initialState = {
  meta: {
    languages: {
      'ru': 'Russian',
      'en': 'English'
    },
    countLearnedWords: 0
  },
  selectedFromLanguage: 'ru',
  selectedToLanguage: 'en',
  isFromLanguageMenuVisible: false,
  isToLanguageMenuVisible: false,
  isCreateGroupFormVisible: false,
  groupName: ''
};

export default (state = initialState, action) => {
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
    case CREATE_GROUP_FORM_VISIBILITY_CHANGED:
      return {
        ...state,
        isCreateGroupFormVisible: !state.isCreateGroupFormVisible
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
