import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Group } from '@/types';
import { GroupSchema } from './group.schema';
import { QueryParams, PaginatedContainer } from '../types';
import { getPaginatedContainerSchema } from '../schemas';
import { GROUPS_QUERY_KEY } from './constants';

const GroupsSchema = getPaginatedContainerSchema(GroupSchema);

export type GroupsQuery = {
  languageFrom?: string;
  languageTo?: string;
  limit?: number;
  offset?: number;
} & QueryParams;
export type GroupsResponse = z.infer<typeof GroupsSchema>;

export async function getGroups(
  query: GroupsQuery,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<PaginatedContainer<Group>> {
  const response = await apiClient.get<GroupsResponse>(`/api/groups/`, { signal, params: query });
  return GroupsSchema.parse(response.data);
}

export function getGroupsOptions(query: GroupsQuery, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [GROUPS_QUERY_KEY, getGroups.name, query],
    queryFn: ({ signal }) => getGroups(query, signal, apiClient),
  })
}
