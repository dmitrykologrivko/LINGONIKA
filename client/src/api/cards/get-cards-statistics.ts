import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { QueryParams } from '../types';
import { CARDS_QUERY_KEY } from './constants';

const CardsStatisticsSchema = z.object({
  countLearned: z.number(),
  countNotLearned: z.number(),
  totalCount: z.number(),
});

export type CardsStatisticsQuery = {
  languageFrom?: string;
  languageTo?: string;
} & QueryParams;
export type CardsStatisticsResponse = z.infer<typeof CardsStatisticsSchema>;

export async function getCardsStatistics(
  query: CardsStatisticsQuery,
  signal: AbortSignal,
  apiClient: AxiosInstance
) {
  const response = await apiClient.get<CardsStatisticsResponse>('/api/cards/stats',  { signal, params: query });
  return CardsStatisticsSchema.parse(response.data);
}

export function getCardsStatisticsOptions(
  query: CardsStatisticsQuery,
  apiClient: AxiosInstance
) {
  return queryOptions({
    queryKey: [CARDS_QUERY_KEY, getCardsStatistics.name, query],
    queryFn: ({ signal }) => getCardsStatistics(query, signal, apiClient),
  });
}
