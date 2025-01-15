import { AxiosInstance } from 'axios';

export async function deleteGroup(
  id: number,
  apiClient: AxiosInstance,
): Promise<void> {
  await apiClient.delete<void>(`/api/groups/${id}`);
}
