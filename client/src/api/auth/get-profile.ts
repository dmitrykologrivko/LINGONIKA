import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Profile } from '@/types';
import { ProfileSchema } from './profile.schema';

export type ProfileResponse = z.infer<typeof ProfileSchema>;

export async function getProfile(
  signal: AbortSignal,
  apiClient: AxiosInstance
): Promise<Profile> {
  const response = await apiClient.get<ProfileResponse>('/api/profile', { signal });
  return ProfileSchema.parse(response.data);
}

export function getProfileOptions(apiClient: AxiosInstance) {
  return queryOptions({
    queryKey: [getProfile.name],
    queryFn: ({ signal }) => getProfile(signal, apiClient),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
