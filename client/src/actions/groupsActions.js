import api from "../services/api/groupsApi";

export const SELECT_FROM_LANGUAGE = 'groups/select-from-language';
export const SELECT_TO_LANGUAGE = 'groups/select-to-language';
export const FETCH_GROUPS_REQUESTED = 'groups/fetch-groups-requested';
export const FETCH_GROUPS_SUCCEEDED = 'groups/fetch-groups-succeeded';
export const FETCH_GROUPS_FAILED = 'groups/fetch-groups-failed';

export function changeSelectedFromLanguage(languageCode) {
  return {
    type: SELECT_FROM_LANGUAGE,
    languageCode
  }
}

export function changeSelectedToLanguage(languageCode) {
  return {
    type: SELECT_TO_LANGUAGE,
    languageCode
  }
}

export function fetchGroups() {
  return dispatch => {
    dispatch({type: FETCH_GROUPS_REQUESTED});

    api.fetchGroups()
      .then(response => dispatch({type: FETCH_GROUPS_SUCCEEDED, groups: response.data}))
      .catch(error => dispatch({type: FETCH_GROUPS_FAILED, error}));
  }
}
