import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { Card } from '@/types';
import { CardSchema } from './card.schema';

export type UpdateCardRequest = Card;
export type UpdateCardResponse = z.infer<typeof CardSchema>;

export async function updateCard(
  request: UpdateCardRequest,
  apiClient: AxiosInstance,
): Promise<Card> {
  const response = await apiClient.put<UpdateCardResponse>(`/api/cards/${request.id}`, request);
  return CardSchema.parse(response.data);
}
