import type { UseGetStoryIdsProps } from "./api";

export const storyKeys = {
  all: ["story"],
  lists: () => [...storyKeys.all, "list"],
  list: (props: UseGetStoryIdsProps) => [...storyKeys.lists(), { ...props }],
  details: () => [...storyKeys.all, "detail"],
  detail: (id: string) => [...storyKeys.details(), id],
};
