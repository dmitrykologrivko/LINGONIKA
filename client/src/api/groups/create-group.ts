import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { Group } from '@/types';
import { GroupSchema } from './group.schema.ts';

export type CreateGroupRequest = Omit<Group, 'id' | 'totalCards' | 'learnedCards'>;
export type CreateGroupResponse = z.infer<typeof GroupSchema>;

export async function createGroup(
  request: CreateGroupRequest,
  apiClient: AxiosInstance,
): Promise<Group> {
  const response = await apiClient.post<CreateGroupResponse>('/api/groups', request);
  return GroupSchema.parse(response.data) ;
}
