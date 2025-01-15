import { z, ZodTypeAny } from 'zod';

export function getPaginatedContainerSchema<T extends ZodTypeAny>(schema: T) {
  return z.object({
    count: z.number(),
    previous: z.string().optional().nullable(),
    next: z.string().optional().nullable(),
    results: z.array<T>(schema),
  });
}
