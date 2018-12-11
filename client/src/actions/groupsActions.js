export const CHANGE_FROM_LANGUAGE_MENU_VISIBILITY = 'groups/change-from-language-menu-visibility';
export const CHANGE_TO_LANGUAGE_MENU_VISIBILITY = 'groups/change-to-language-menu-visibility';
export const SELECT_FROM_LANGUAGE = 'groups/select-from-language';
export const SELECT_TO_LANGUAGE = 'groups/select-to-language';
export const CHANGE_CREATE_GROUP_FORM_VISIBILITY = "groups/change-create-group-form-visibility";
export const CHANGE_CREATABLE_GROUP_NAME = "groups/change-creatable-group-name";

export function changeFromLanguageMenuVisibility() {
  return {
    type: CHANGE_FROM_LANGUAGE_MENU_VISIBILITY
  }
}

export function changeToLanguageMenuVisibility() {
  return {
    type: CHANGE_TO_LANGUAGE_MENU_VISIBILITY
  }
}

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

export function changeCreateGroupFormVisibility() {
  return {
    type: CHANGE_CREATE_GROUP_FORM_VISIBILITY
  }
}

export function changeCreatableGroupName(name) {
  return {
    type: CHANGE_CREATABLE_GROUP_NAME,
    creatableGroupName: name
  }
}
