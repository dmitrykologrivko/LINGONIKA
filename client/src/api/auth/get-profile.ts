import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { queryOptions } from '@tanstack/react-query';
import { Profile } from '@/types';

const ProfileSchema = z.object({
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

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
    queryKey: ['getProfile'],
    queryFn: ({ signal }) => getProfile(signal, apiClient),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}
