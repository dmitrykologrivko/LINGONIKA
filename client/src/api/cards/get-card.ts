import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Card } from '@/types';
import { CardSchema } from './card.schema';
import { CARDS_QUERY_KEY } from './constants';

export type CardResponse = z.infer<typeof CardSchema>;

export async function getCard(
  id: number,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<Card> {
  const response = await apiClient.get<CardResponse>(`/api/cards/${id}`, { signal });
  return CardSchema.parse(response.data) ;
}

export function getCardOptions(id: number, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [CARDS_QUERY_KEY, getCard.name, id],
    queryFn: ({ signal }) => getCard(id, signal, apiClient),
  })
}
