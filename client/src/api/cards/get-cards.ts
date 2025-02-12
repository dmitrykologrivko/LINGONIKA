import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { Card } from '@/types';
import { CardSchema } from './card.schema';
import { QueryParams, PaginatedContainer } from '../types';
import { getPaginatedContainerSchema } from '../schemas';
import { flatMapPages } from '../utils';

const CardsSchema = getPaginatedContainerSchema(CardSchema);

export type CardsQuery = {
  languageFrom?: string;
  languageTo?: string;
  groupId?: number;
  isLearned?: boolean;
  limit?: number;
  page?: number;
  sortBy?: string;
} & QueryParams;
export type CardsResponse = z.infer<typeof CardsSchema>;

export async function getCards(
  query: CardsQuery,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<PaginatedContainer<Card>> {
  const params: {
    languageFrom?: string;
    languageTo?: string;
    isLearned?: boolean;
    where?: string[];
    limit?: number;
    page?: number;
    sortBy?: string;
  } = {
    languageFrom: query.languageFrom,
    languageTo: query.languageTo,
    isLearned: query.isLearned,
    where: [],
    limit: query.limit,
    page: query.page,
    sortBy: query.sortBy,
  };
  if (query.isLearned !== undefined) {
    params.where?.push(`isLearned__eq=${Number(query.isLearned)}`);
  }
  if (query.groupId) {
    params.where?.push(`group__eq=${Number(query.groupId)}`);
  }

  const response = await apiClient.get<CardsResponse>(`/api/cards/`, { signal, params });
  return CardsSchema.parse(response.data);
}

export function getCardsOptions(query: CardsQuery, apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [getCards.name, query],
    queryFn: ({ signal }) => getCards(query, signal, apiClient),
  })
}

export function getInfiniteCardsOptions(query: CardsQuery, apiClient: AxiosInstance) {
  return infiniteQueryOptions({
    queryKey: [getCards.name, query],
    queryFn: ({ signal, pageParam }) =>
      getCards({ ...query, page: pageParam }, signal, apiClient),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : undefined,
    select: flatMapPages,
  });
}
