import client from './apiClient';

const API_PREFIX = 'groups';

function fetchGroups() {
  return client.get(API_PREFIX);
}

function fetchGroupsMeta() {
  return client.get(`${API_PREFIX}/meta`);
}

export default {
  fetchGroups: fetchGroups,
  fetchGroupsMeta: fetchGroupsMeta
};
