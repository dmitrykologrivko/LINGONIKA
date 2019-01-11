import client from './apiClient';

const API_PREFIX = 'groups';

function fetchGroups() {
  return client.get(API_PREFIX);
}

function fetchGroupsMeta() {
  return client.get(`${API_PREFIX}/meta`);
}

function createGroup(group) {
  return client.post(API_PREFIX, group);
}

function editGroup(group) {
  return client.put(`${API_PREFIX}/${group.id}`, group);
}

function deleteGroup(id) {
  return client.delete(`${API_PREFIX}/${id}`);
}

export default {
  fetchGroups: fetchGroups,
  fetchGroupsMeta: fetchGroupsMeta,
  createGroup: createGroup,
  editGroup: editGroup,
  deleteGroup: deleteGroup
};
