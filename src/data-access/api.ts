import { useQuery } from "@tanstack/react-query";

import { storySchema } from "@/schemas";
import { CategoryPaths, type Category, type PaginationType } from "@/types";
import { storyKeys } from "./api.keys";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";

const buildUrl = (
  path: string,
  params?: Record<string, string | number | undefined>,
) => {
  const url = new URL(baseUrl + path);
  url.searchParams.append("print", "pretty");

  if (!params) return url;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined)
      url.searchParams.append(key, value.toString());
  });

  return url;
};

export type UseGetStoryIdsProps = {
  category?: Category;
  pagination?: PaginationType;
};

export const useGetStoryIds = ({
  category = "top",
  pagination = { page: 1, size: 10 },
}: UseGetStoryIdsProps) => {
  const { page, size } = pagination;

  const getStoryIds = async (): Promise<string[]> => {
    const response = await fetch(buildUrl(CategoryPaths[category]));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const query = useQuery({
    queryKey: storyKeys.list({ category }),
    queryFn: getStoryIds,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000, // poll every minute
  });

  const start = (page - 1) * size;
  const end = start + size;
  const ids = query.data;
  const paginatedIds = ids?.slice(start, end) || [];

  return { paginatedIds, ...query };
};

export const useGetStory = (id: string) => {
  const getStory = async () => {
    const response = await fetch(buildUrl(`item/${id}.json`));
    if (!response.ok) throw new Error(`HTTP error: status: ${response.status}`);

    const json = await response.json();
    const parsed = storySchema.safeParse(json);

    if (!parsed.success) {
      console.warn("Invalid story payload", parsed.error);
      return json; // fall back
    }

    return parsed.data;
  };

  const query = useQuery({
    queryKey: storyKeys.detail(id),
    queryFn: getStory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return query;
};
