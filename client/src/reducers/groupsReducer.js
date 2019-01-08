import {
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
  FETCH_GROUPS_REQUESTED,
  FETCH_GROUPS_SUCCEEDED,
  FETCH_GROUPS_FAILED
} from '../actions/groupsActions';

// TODO: Temp solution
const initialState = {
  meta: {
    languages: {
      'ru': 'Russian',
      'en': 'English'
    },
    countLearnedWords: 0,
    countWords: 0
  },
  list: [],
  selectedFromLanguage: 'ru',
  selectedToLanguage: 'en'
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
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
    case FETCH_GROUPS_REQUESTED:
      return {
        ...state
      };
    case FETCH_GROUPS_SUCCEEDED:
      return {
        ...state,
        list: action.groups
      };
    case FETCH_GROUPS_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}
