import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { Group } from '@/types';
import { GroupSchema } from './group.schema.ts';

export type UpdateGroupRequest = Group;
export type UpdateGroupResponse = z.infer<typeof GroupSchema>;

export async function updateGroup(
  request: UpdateGroupRequest,
  apiClient: AxiosInstance,
): Promise<Group> {
  const response = await apiClient.put<UpdateGroupResponse>(`/api/groups/${request.id}`, request);
  return GroupSchema.parse(response.data);
}
