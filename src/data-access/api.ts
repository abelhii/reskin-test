import type { Story, Pagination } from "@/types";
import { useQuery } from "@tanstack/react-query";
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

export const useGetTopStoryIds = () => {
  const getTopStoryIds = async (): Promise<string[]> => {
    const response = await fetch(buildUrl("topstories.json"));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const query = useQuery({
    queryKey: storyKeys.top.all(),
    queryFn: getTopStoryIds,
    staleTime: Infinity,
  });

  return query;
};

export const useGetNewStoryIds = () => {
  const getNewStoryIds = async (): Promise<string[]> => {
    const response = await fetch(buildUrl("newstories.json"));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const query = useQuery({
    queryKey: storyKeys.new.all(),
    queryFn: getNewStoryIds,
    staleTime: Infinity,
  });

  return query;
};

export type UseGetStoriesProps = {
  type?: "top" | "new";
  pagination?: Pagination;
};

export const useGetStories = ({
  type = "top",
  pagination = { page: 1, size: 10 },
}: UseGetStoriesProps) => {
  const { data: topStoryIds } = useGetTopStoryIds();
  const { data: newStoryIds } = useGetNewStoryIds();

  const ids = type === "top" ? topStoryIds : newStoryIds;

  const { page, size } = pagination;
  const start = (page - 1) * size;
  const end = start + size;
  const storyIds = ids?.slice(start, end) || [];

  const getStory = async (itemId: string): Promise<Story> => {
    const response = await fetch(buildUrl(`item/${itemId}.json`));
    if (!response.ok) throw new Error(`HTTP error: status: ${response.status}`);
    return await response.json();
  };

  const getTopStories = async () => {
    const stories = await Promise.all(storyIds.map((id) => getStory(id)));
    return stories;
  };

  const query = useQuery({
    queryKey: storyKeys.list({type, pagination}),
    queryFn: getTopStories,
    enabled: !!ids,
  });

  return query;
};
