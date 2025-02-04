import { AxiosInstance } from 'axios';

export type DeleteCardsRequest = {
  ids: number[];
};

export async function deleteCards(
  request: DeleteCardsRequest,
  apiClient: AxiosInstance,
): Promise<void> {
  await apiClient.post<void>(`/api/cards/action/bulk-delete`, request);
}
