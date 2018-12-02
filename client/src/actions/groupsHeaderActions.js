import {
  FROM_LANGUAGE_MENU_VISIBILITY_CHANGED,
  TO_LANGUAGE_MENU_VISIBILITY_CHANGED
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
