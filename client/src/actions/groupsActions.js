export const SELECT_FROM_LANGUAGE = 'groups/select-from-language';
export const SELECT_TO_LANGUAGE = 'groups/select-to-language';

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
