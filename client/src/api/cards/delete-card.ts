import { AxiosInstance } from 'axios';

export async function deleteCard(
  id: number,
  apiClient: AxiosInstance,
): Promise<void> {
  await apiClient.delete<void>(`/api/cards/${id}`);
}
