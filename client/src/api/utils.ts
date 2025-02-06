import { InfiniteData } from '@tanstack/react-query';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants';
import { PaginatedContainer } from './types';

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

export function flatMapPages<T = any>(data: InfiniteData<PaginatedContainer<T>, number>): T[] {
  return data.pages.flatMap(page => page.results);
}
