import client from './apiClient';

const API_PREFIX = 'groups';

function fetchGroups(query = {}) {
  return client.get(API_PREFIX, {params: query});
}

function fetchGroupsMeta(query = {}) {
  return client.get(`${API_PREFIX}/meta`, {params: query});
}

function fetchGroup(id) {
  return client.get(`${API_PREFIX}/${id}`);
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
  fetchGroup: fetchGroup,
  createGroup: createGroup,
  editGroup: editGroup,
  deleteGroup: deleteGroup
};
