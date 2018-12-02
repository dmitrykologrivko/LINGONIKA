import {
  FROM_LANGUAGE_MENU_VISIBILITY_CHANGED,
  TO_LANGUAGE_MENU_VISIBILITY_CHANGED
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
  isToLanguageMenuVisible: false
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
    default:
      return state;
  }
}
