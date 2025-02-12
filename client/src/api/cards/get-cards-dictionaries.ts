import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { CARDS_QUERY_KEY } from './constants';

const CardsDictionarySchema = z.object({
  languageFrom: z.string(),
  languageTo: z.string(),
  countLearned: z.number(),
  totalCount: z.number(),
});
const CardsDictionariesSchema = z.array(CardsDictionarySchema);

export type CardsDictionariesResponse = z.infer<typeof CardsDictionariesSchema>;

export async function getCardsDictionaries(
  signal: AbortSignal,
  apiClient: AxiosInstance
) {
  const response = await apiClient.get<CardsDictionariesResponse>('/api/cards/dictionaries',  { signal });
  return CardsDictionariesSchema.parse(response.data);
}

export function getCardsDictionariesOptions(apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [CARDS_QUERY_KEY, getCardsDictionaries.name],
    queryFn: ({ signal }) => getCardsDictionaries(signal, apiClient),
  });
}
