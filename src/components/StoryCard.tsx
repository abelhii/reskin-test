import { useGetStory } from "@/data-access/api";
import { logger } from "@/lib/logger";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type StoryCardProps = {
  id: string;
  index: number;
};

export function StoryCard({ id, index }: StoryCardProps) {
  const { data: story, isLoading, isError, error } = useGetStory(id);

  if (isLoading) {
    return (
      <Card
        aria-label="Loading..."
        className="min-h-23.5 w-full rounded-sm shadow-none"
      >
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    logger.error(error);

    return (
      <Card className="w-full border-red-300">
        <CardContent>
          <p>
            Something went wrong, please contact support at
            <Button variant="link">
              <a href="mailto:abelhii@gmail.com">abelhii@outlook.com</a>
            </Button>
          </p>
        </CardContent>
      </Card>
    );
  }

  const host = (() => {
    if (!story.url) return null;
    const url = new URL(story.url);
    return url.host;
  })();

  return (
    <Card className="min-h-23.5 w-full rounded-sm shadow-none">
      <CardContent className="flex justify-start gap-4">
        <span className="text-sm text-gray-400">{index}.</span>
        <div className="flex flex-col items-start">
          <a href={story.url} target="_blank">
            <h4 className="flex flex-wrap items-center gap-1">
              {story.title}
              {host && (
                <span aria-label="host" className="text-sm text-gray-400">{`(${host})`}</span>
              )}
            </h4>
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
