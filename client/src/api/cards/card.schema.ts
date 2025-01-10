import { z } from 'zod';

export const CardSchema = z.object({
  id: z.number(),
  textFrom: z.string(),
  textTo: z.string(),
  languageFrom: z.string(),
  languageTo: z.string(),
  example: z.string().optional(),
  isLearned: z.boolean(),
  groupId: z.number().optional(),
});
