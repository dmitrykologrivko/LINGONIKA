import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  languageFrom: z.string(),
  languageTo: z.string(),
  learnedCards: z.number(),
  totalCards: z.number(),
});
