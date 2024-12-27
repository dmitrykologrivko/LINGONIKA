import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { ACCESS_TOKEN_KEY } from '../constants';

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
): Promise<void> {
  const response = await apiClient.post<LoginResponse>('/api/auth/jwt/login', request);
  const dto = LoginSchema.parse(response.data);
  localStorage.setItem(ACCESS_TOKEN_KEY, dto.accessToken);
}
