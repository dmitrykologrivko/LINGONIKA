let accessToken: string | null;

export function isAuthenticated() {
  return !!getAuthenticationToken();
}

export function getAuthenticationToken() {
  return accessToken;
}

export function setAuthenticationToken(token: string) {
  accessToken = token;
}

export function clearAuthenticationToken() {
  accessToken = null;
}
