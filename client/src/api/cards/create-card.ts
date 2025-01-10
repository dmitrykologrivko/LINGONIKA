import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { Card } from '@/types';
import { CardSchema } from './card.schema';

export type CreateCardRequest = Omit<Card, 'id'>;
export type CreateCardResponse = z.infer<typeof CardSchema>;

export async function createCard(
  request: CreateCardRequest,
  apiClient: AxiosInstance,
): Promise<Card> {
  const response = await apiClient.post<CreateCardResponse>('/api/cards', request);
  return CardSchema.parse(response.data) ;
}
