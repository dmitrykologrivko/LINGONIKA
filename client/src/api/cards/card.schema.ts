import { z } from 'zod';

export const CardSchema = z.object({
  id: z.number(),
  textFrom: z.string(),
  textTo: z.string(),
  languageFrom: z.string(),
  languageTo: z.string(),
  example: z.string().optional().nullable(),
  isLearned: z.boolean().optional(),
  groupId: z.number().optional().nullable(),
  group: z.object({
    id: z.number(),
    name: z.string(),
  }).optional().nullable(),
});
