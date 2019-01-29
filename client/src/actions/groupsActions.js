import api from "../services/api/groupsApi";

export const SELECT_FROM_LANGUAGE = 'groups/select-from-language';
export const SELECT_TO_LANGUAGE = 'groups/select-to-language';
// Fetch groups data
export const FETCH_GROUPS_DATA_REQUESTED = 'groups/fetch-groups-data-requested';
export const FETCH_GROUPS_DATA_SUCCEEDED = 'groups/fetch-groups-data-succeeded';
export const FETCH_GROUPS_DATA_FAILED = 'groups/fetch-groups-data-failed';
// Fetch groups
export const FETCH_GROUPS_REQUESTED = 'groups/fetch-groups-requested';
export const FETCH_GROUPS_SUCCEEDED = 'groups/fetch-groups-succeeded';
export const FETCH_GROUPS_FAILED = 'groups/fetch-groups-failed';
// Fetch group
export const FETCH_GROUP_REQUESTED = 'groups/fetch-group-requested';
export const FETCH_GROUP_SUCCEEDED = 'groups/fetch-group-succeeded';
export const FETCH_GROUP_FAILED = 'groups/fetch-group-failed';
// Fetch groups meta
export const FETCH_GROUPS_META_REQUESTED = 'groups/fetch-groups-meta-requested';
export const FETCH_GROUPS_META_SUCCEEDED = 'groups/fetch-groups-meta-succeeded';
export const FETCH_GROUPS_META_FAILED = 'groups/fetch-groups-meta-failed';
// Crete group
export const CREATE_GROUP_REQUESTED = 'groups/create-group-requested';
export const CREATE_GROUP_SUCCEEDED = 'groups/create-group-succeeded';
export const CREATE_GROUP_FAILED = 'groups/create-group-failed';
// Edit group
export const EDIT_GROUP_REQUESTED = 'groups/edit-group-requested';
export const EDIT_GROUP_SUCCEEDED = 'groups/edit-group-succeeded';
export const EDIT_GROUP_FAILED = 'groups/edit-group-failed';
// Delete group
export const DELETE_GROUP_REQUESTED = 'groups/delete-group-requested';
export const DELETE_GROUP_SUCCEEDED = 'groups/delete-group-succeeded';
export const DELETE_GROUP_FAILED = 'groups/delete-group-failed';

export function selectFromLanguage(languageCode) {
  return {
    type: SELECT_FROM_LANGUAGE,
    languageCode
  }
}

export function selectToLanguage(languageCode) {
  return {
    type: SELECT_TO_LANGUAGE,
    languageCode
  }
}

export function fetchGroupsData() {
  return async (dispatch, getState) => {
    const state = getState().groups;

    dispatch({type: FETCH_GROUPS_DATA_REQUESTED});

    try {
      const metaQuery = {
        fromLanguage: state.filters.fromLanguage,
        toLanguage: state.filters.toLanguage
      };

      if (!metaQuery.fromLanguage && !metaQuery.toLanguage) {
        const response = await api.fetchGroupsMeta();

        if (response.data.languages && Object.keys(response.data.languages).length > 0) {
          metaQuery.fromLanguage = Object.keys(response.data.languages)[0];
          metaQuery.toLanguage = Object.keys(response.data.languages)[0];
        }
      }

      const groupsQuery = {
        filter: {
          where: {
            fromLanguage: metaQuery.fromLanguage,
            toLanguage: metaQuery.toLanguage
          }
        }
      };

      const responses = await Promise.all([api.fetchGroupsMeta(metaQuery), api.fetchGroups(groupsQuery)]);

      dispatch({
        type: FETCH_GROUPS_DATA_SUCCEEDED,
        fromLanguage: metaQuery.fromLanguage,
        toLanguage: metaQuery.toLanguage,
        meta: responses[0].data,
        list: responses[1].data
      });
    } catch (error) {
      dispatch({type: FETCH_GROUPS_DATA_FAILED, error});
    }
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

export function fetchGroupsMeta() {
  return dispatch => {
    dispatch({type: FETCH_GROUPS_META_REQUESTED});

    api.fetchGroupsMeta()
      .then(response => dispatch({type: FETCH_GROUPS_META_SUCCEEDED, meta: response.data}))
      .catch(error => dispatch({type: FETCH_GROUPS_META_FAILED, error}));
  }
}

export function fetchGroup(id) {
  return dispatch => {
     dispatch({type: FETCH_GROUP_REQUESTED});

     api.fetchGroup(id, {filter: {include: 'cards'}})
       .then(response => dispatch({type: FETCH_GROUP_SUCCEEDED, detail: response.data}))
       .catch(error => dispatch({type: FETCH_GROUP_FAILED, error}));
  }
}

export function createGroup(group) {
  return dispatch => {
    dispatch({type: CREATE_GROUP_REQUESTED});

    api.createGroup(group)
      .then(response => dispatch({type: CREATE_GROUP_SUCCEEDED, group: response.data}))
      .catch(error => dispatch({type: CREATE_GROUP_FAILED, error}));
  }
}

export function editGroup(group) {
  return dispatch => {
    dispatch({type: EDIT_GROUP_REQUESTED});

    api.editGroup(group)
      .then(response => dispatch({type: EDIT_GROUP_SUCCEEDED, group: response.data}))
      .catch(error => dispatch({type: EDIT_GROUP_FAILED, error}));
  }
}

export function deleteGroup(id) {
  return dispatch => {
    dispatch({type: DELETE_GROUP_REQUESTED});

    api.deleteGroup(id)
      .then(response => dispatch({type: DELETE_GROUP_SUCCEEDED, id}))
      .catch(error => dispatch({type: DELETE_GROUP_FAILED, error}));
  }
}
