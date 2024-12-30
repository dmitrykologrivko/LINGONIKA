import { ACCESS_TOKEN_STORAGE_KEY } from './constants';

export function isAuthenticated() {
  return !!getAuthenticationToken();
}

export function getAuthenticationToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAuthenticationToken(token: string) {
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function clearAuthenticationToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
