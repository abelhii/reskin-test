import { useGetStory } from "@/data-access/api";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type StoryCardProps = {
  id: string;
  index: number;
};

export function StoryCard({ id, index }: StoryCardProps) {
  const { data: story } = useGetStory(id);

  if (!story) return <Skeleton className="min-h-23.5" />;

  return (
    <Card className="min-h-23.5 w-full rounded-sm shadow-none">
      <CardContent className="flex justify-start gap-4">
        <span className="text-sm text-gray-400">{index}.</span>
        <div className="flex flex-col items-start">
          <a href={story.url} target="_blank">
            <h3>{story.title}</h3>
            <span className="text-xs text-gray-400">{`(${story.url})`}</span>
          </a>
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">{story.score} points</span>
            <span className="text-sm text-gray-400">
              {new Date(story.time * 1000).toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">{story.by}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
