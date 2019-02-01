import client from './apiClient';

const API_PREFIX = 'accounts';

function fetchAccount() {
  return client.get(`${API_PREFIX}/me`);
}

export default {
  fetchAccount: fetchAccount
};
