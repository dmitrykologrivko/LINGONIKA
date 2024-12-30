import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Language } from '@/types';
import { QueryParams } from '../types';

const LanguageSchema = z.object({
  code: z.string(),
  name: z.string(),
});
const LanguagesSchema = z.array(LanguageSchema);

export type LanguagesQuery = {} & QueryParams;
export type LanguagesResponse = z.infer<typeof LanguagesSchema>;

export async function getLanguages(
  _: LanguagesQuery,
  signal: AbortSignal,
  apiClient: AxiosInstance
) {
  const response = await apiClient.get<LanguagesResponse>('/api/languages',  { signal });
  const dto = LanguagesSchema.parse(response.data);
  return dto.map(item => ({code: item.code, name: item.name} as Language));
}

export function getLanguagesOptions(
  query: LanguagesQuery,
  apiClient: AxiosInstance
) {
  return queryOptions({
    queryKey: ['getLanguages', query],
    queryFn: ({ signal }) =>
      getLanguages(query, signal, apiClient),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
