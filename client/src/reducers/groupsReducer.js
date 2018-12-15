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

function groupsDataReducer(state, action) {
  if (!state) {
    // TODO: Temp solution
    state = {
      list: [

      ]
    }
  }

  return state;
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

export function groups(state = initialState, action) {
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

export default combineReducers({
  groups,
  groupsMeta: groupsMetaReducer,
  groupsData: groupsDataReducer,
  createGroupBox: createGroupBoxReducer
});
