import {
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE,
  FETCH_GROUPS_DATA_REQUESTED,
  FETCH_GROUPS_DATA_SUCCEEDED,
  FETCH_GROUPS_DATA_FAILED,
  FETCH_GROUPS_REQUESTED,
  FETCH_GROUPS_SUCCEEDED,
  FETCH_GROUPS_FAILED,
  FETCH_GROUPS_META_REQUESTED,
  FETCH_GROUPS_META_SUCCEEDED,
  FETCH_GROUPS_META_FAILED,
  FETCH_GROUP_REQUESTED,
  FETCH_GROUP_SUCCEEDED,
  FETCH_GROUP_FAILED,
  CREATE_GROUP_REQUESTED,
  CREATE_GROUP_SUCCEEDED,
  CREATE_GROUP_FAILED,
  EDIT_GROUP_REQUESTED,
  EDIT_GROUP_SUCCEEDED,
  EDIT_GROUP_FAILED,
  DELETE_GROUP_REQUESTED,
  DELETE_GROUP_SUCCEEDED,
  DELETE_GROUP_FAILED
} from '../actions/groupsActions';

import {
  push,
  updateById,
  removeById
} from "../utils/arrays";

const initialState = {
  meta: {
    languages: {},
    countLearnedWords: 0,
    countWords: 0
  },
  list: [],
  detail: {
    cards: []
  },
  filters: {
    fromLanguage: '',
    toLanguage: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_FROM_LANGUAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          fromLanguage: action.languageCode
        }
      };
    case SELECT_TO_LANGUAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          toLanguage: action.languageCode
        }
      };
    case FETCH_GROUPS_DATA_REQUESTED:
      return {
        ...state
      };
    case FETCH_GROUPS_DATA_SUCCEEDED:
      return {
        ...state,
        meta: action.meta,
        list: action.list,
        filters: {
          ...state.filters,
          fromLanguage: action.fromLanguage,
          toLanguage: action.toLanguage
        }
      };
    case FETCH_GROUPS_DATA_FAILED:
      return {
        ...state
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
    case FETCH_GROUP_REQUESTED:
      return {
        ...state
      };
    case FETCH_GROUP_SUCCEEDED:
      return {
        ...state,
        detail: action.detail
      };
    case FETCH_GROUP_FAILED:
      return {
        ...state
      };
    case CREATE_GROUP_REQUESTED:
      return {
        ...state
      };
    case CREATE_GROUP_SUCCEEDED:
      return {
        ...state,
        list: push(state.list.slice(), action.group)
      };
    case CREATE_GROUP_FAILED:
      return {
        ...state
      };
    case EDIT_GROUP_REQUESTED:
      return {
        ...state
      };
    case EDIT_GROUP_SUCCEEDED:
      return {
        ...state,
        list: updateById(state.list.slice(), action.group)
      };
    case EDIT_GROUP_FAILED:
      return {
        ...state
      };
    case DELETE_GROUP_REQUESTED:
      return {
        ...state
      };
    case DELETE_GROUP_SUCCEEDED:
      return {
        ...state,
        list: removeById(state.list.slice(), action.id)
      };
    case DELETE_GROUP_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}
