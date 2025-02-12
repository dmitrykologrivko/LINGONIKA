import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Card } from '@/types';
import { CardSchema } from './card.schema';
import { CARDS_QUERY_KEY } from './constants';

const CardsSchema = z.array(CardSchema);
export type LearnCardsByGroupResponse = z.infer<typeof CardsSchema>;

export async function learnCardsByGroup(
  groupId: number,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<Card[]> {
  const response = await apiClient.get<LearnCardsByGroupResponse>(`/api/cards/learn/group/${groupId}`, { signal });
  return CardsSchema.parse(response.data);
}

export function learnCardsByGroupOptions(groupId: number, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [CARDS_QUERY_KEY, learnCardsByGroup.name, groupId],
    queryFn: ({ signal }) => learnCardsByGroup(groupId, signal, apiClient),
  })
}
