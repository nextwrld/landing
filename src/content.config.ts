import { defineCollection, z } from 'astro:content';

const caseSchema = z.object({
  translationKey: z.string(),
  locale: z.enum(['es', 'en']),
  title: z.string(),
  summary: z.string(),
  client: z.string().optional()
});

const insightSchema = z.object({
  translationKey: z.string(),
  locale: z.enum(['es', 'en']),
  title: z.string(),
  description: z.string()
});

export const collections = {
  cases: defineCollection({
    type: 'content',
    schema: caseSchema
  }),
  insights: defineCollection({
    type: 'content',
    schema: insightSchema
  })
};
