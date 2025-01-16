import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { Profile } from '@/types';
import { ProfileSchema } from './profile.schema';

export type UpdateProfileRequest = Profile;
export type UpdateProfileResponse = z.infer<typeof ProfileSchema>;

export async function updateProfile(
  request: UpdateProfileRequest,
  apiClient: AxiosInstance,
): Promise<Profile> {
  const response = await apiClient.patch<UpdateProfileResponse>(`/api/profile/`, request);
  return ProfileSchema.parse(response.data);
}
