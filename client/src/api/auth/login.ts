import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { setAuthenticationToken } from '../utils';

const LoginSchema = z.object({
  accessToken: z.string()
});

export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = z.infer<typeof LoginSchema>;

export async function login(
  request: LoginRequest,
  apiClient: AxiosInstance,
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/auth/jwt/login', request);
  const dto = LoginSchema.parse(response.data);
  setAuthenticationToken(dto.accessToken);
  return dto;
}
