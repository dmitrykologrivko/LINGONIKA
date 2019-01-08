import {
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
  FETCH_GROUPS_REQUESTED,
  FETCH_GROUPS_SUCCEEDED,
  FETCH_GROUPS_FAILED,
  FETCH_GROUPS_META_REQUESTED,
  FETCH_GROUPS_META_SUCCEEDED,
  FETCH_GROUPS_META_FAILED,
} from '../actions/groupsActions';

const initialState = {
  meta: {
    languages: {},
    countLearnedWords: 0,
    countWords: 0
  },
  list: [],
  selectedFromLanguage: '',
  selectedToLanguage: ''
};

export default (state = initialState, action) => {
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
    case FETCH_GROUPS_META_REQUESTED:
      return {
        ...state
      };
    case FETCH_GROUPS_META_SUCCEEDED:
      return {
        ...state,
        meta: action.meta
      };
    case FETCH_GROUPS_META_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}
