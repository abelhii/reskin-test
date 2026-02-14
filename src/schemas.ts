import { z } from "zod";

export const storySchema = z
  .object({
    id: z.number(),
    time: z.number(),
    by: z.string().optional(),
    title: z.string().optional(),
    url: z.url().optional(),
    score: z.number().optional(),
  })
  .loose();
