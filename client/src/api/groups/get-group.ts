import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Group } from '@/types';
import { GroupSchema } from './group.schema.ts';

export type GroupResponse = z.infer<typeof GroupSchema>;

export async function getGroup(
  id: number,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<Group> {
  const response = await apiClient.get<GroupResponse>(`/api/groups/${id}`, { signal });
  return GroupSchema.parse(response.data) ;
}

export function getGroupOptions(id: number, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [getGroup.name, id],
    queryFn: ({ signal }) => getGroup(id, signal, apiClient),
  })
}
