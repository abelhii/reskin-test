import { useGetStoryIds } from "@/data-access/api";
import type { Category } from "@/types";
import { StoryCard } from "./StoryCard";

type StoriesProps = {
  category: Category;
};

export function Stories({ category }: StoriesProps) {
  const { storyIds } = useGetStoryIds({ category });

  return (
    <div className="flex flex-col items-start gap-4">
      {storyIds.map((id) => (
        <StoryCard key={id} id={id} />
      ))}
    </div>
  );
}
