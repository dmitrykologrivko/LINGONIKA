import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Card } from '@/types';
import { CardSchema } from './card.schema';

const CardsSchema = z.array(CardSchema);
export type LearnCardsByLanguagesResponse = z.infer<typeof CardsSchema>;

export async function learnCardsByLanguages(
  languageFrom: string,
  languageTo: string,
  signal: AbortSignal,
  apiClient: AxiosInstance,
): Promise<Card[]> {
  const response = await apiClient.get<LearnCardsByLanguagesResponse>(`/api/cards/learn/languages/${languageFrom}/${languageTo}`, { signal });
  return CardsSchema.parse(response.data);
}

export function learnCardsByLanguagesOptions(
  languageFrom: string,
  languageTo: string,
  apiClient: AxiosInstance,
) {
  return queryOptions({
    queryKey: [learnCardsByLanguages.name, languageFrom, languageTo],
    queryFn: ({ signal }) =>
      learnCardsByLanguages(languageFrom, languageTo, signal, apiClient),
  })
}
