import type { UseGetStoriesProps } from "./api";

export const storyKeys = {
  all: ["story"],
  lists: () => [...storyKeys.all, "list"],
  list: (props: UseGetStoriesProps) => [...storyKeys.lists(), props],

  top: {
    all: () => [...storyKeys.all, "top"],
  },

  new: {
    all: () => [...storyKeys.all, "new"],
  },
};
