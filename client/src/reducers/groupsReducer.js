import {
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
} from '../actions/groupsActions';

// TODO: Temp solution
const initialState = {
  meta: {
    languages: {
      'ru': 'Russian',
      'en': 'English'
    },
    countLearnedWords: 0
  },
  list: [
    {
      id: 1,
      name: 'Test #1',
      countLearnedWords: 1,
      countWords: 5
    },
    {
      id: 2,
      name: 'Test #2',
      countLearnedWords: 1,
      countWords: 5
    },
    {
      id: 3,
      name: 'Test #3',
      countLearnedWords: 1,
      countWords: 5
    },
    {
      id: 4,
      name: 'Test #4',
      countLearnedWords: 1,
      countWords: 5
    },
    {
      id: 5,
      name: 'Test #5',
      countLearnedWords: 1,
      countWords: 5
    }
  ],
  selectedFromLanguage: 'ru',
  selectedToLanguage: 'en'
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
    default:
      return state;
  }
}
