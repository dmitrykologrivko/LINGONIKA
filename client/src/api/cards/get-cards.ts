import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Card } from '@/types';
import { CardSchema } from './card.schema';
import { QueryParams, PaginatedContainer } from '../types';
import { getPaginatedContainerSchema } from '../schemas';

export const CardsSchema = getPaginatedContainerSchema(CardSchema);

export type CardsQuery = {
  languageFrom?: string;
  languageTo?: string;
  limit?: number;
  offset?: number;
} & QueryParams;
export type CardsResponse = z.infer<typeof CardsSchema>;

export async function getCards(
  query: CardsQuery,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<PaginatedContainer<Card>> {
  const response = await apiClient.get<CardsResponse>(`/api/cards/`, { signal, params: query });
  return CardsSchema.parse(response.data);
}

export function getCardsOptions(query: CardsQuery, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [getCards.name, query],
    queryFn: ({ signal }) => getCards(query, signal, apiClient),
  })
}
