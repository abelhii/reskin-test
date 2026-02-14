import { z } from "zod";
import type { storySchema } from "./schemas";

export type Category = "top" | "new" | "ask";

export const CategoryPaths: Record<Category, string> = {
  top: "topstories.json",
  new: "newstories.json",
  ask: "askstories.json",
};

export type Story = z.infer<typeof storySchema>;

export type PaginationType = {
  page: number;
  size: number;
};
