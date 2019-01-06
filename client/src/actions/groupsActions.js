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
