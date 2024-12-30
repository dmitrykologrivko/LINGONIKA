import { AxiosInstance } from 'axios';

export type RegisterRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type RegisterResponse = void;

export async function register(
  request: RegisterRequest,
  apiClient: AxiosInstance,
): Promise<RegisterResponse> {
  await apiClient.post<RegisterResponse>('/api/profile/register', request);
}
