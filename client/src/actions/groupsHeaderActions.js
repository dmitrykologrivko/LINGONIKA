import {
  FROM_LANGUAGE_MENU_VISIBILITY_CHANGED,
  TO_LANGUAGE_MENU_VISIBILITY_CHANGED,
  SELECTED_FROM_LANGUAGE_CHANGED,
  SELECTED_TO_LANGUAGE_CHANGED
} from '../constants/actionTypes';

export function changeFromLanguageMenuVisibility() {
  return {
    type: FROM_LANGUAGE_MENU_VISIBILITY_CHANGED
  }
}

export function changeToLanguageMenuVisibility() {
  return {
    type: TO_LANGUAGE_MENU_VISIBILITY_CHANGED
  }
}

export function changeSelectedFromLanguage(languageCode) {
  return {
    type: SELECTED_FROM_LANGUAGE_CHANGED,
    languageCode
  }
}

export function changeSelectedToLanguage(languageCode) {
  return {
    type: SELECTED_TO_LANGUAGE_CHANGED,
    languageCode
  }
}
