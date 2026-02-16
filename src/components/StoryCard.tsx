import { formatDistanceToNowStrict } from "date-fns";
import {
  ArrowBigUp,
  Clock,
  ExternalLink,
  MessageSquare,
  User,
} from "lucide-react";
import { toast } from "sonner";

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

  if (!story || isError) {
    logger.error("[StoryCard Error]:", story, error);

    return (
      <Card className="w-full border-red-300">
        <CardContent>
          <p>
            Something went wrong, please contact support at{" "}
            <Button asChild variant="link" size="content">
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

  const date = formatDistanceToNowStrict(new Date(story.time * 1000), {
    addSuffix: true,
  });

  return (
    <Card className="flex justify-center min-h-23.5 w-full rounded-sm shadow-none py-4">
      <CardContent className="flex flex-wrap justify-start gap-2 sm:flex-nowrap sm:gap-4 px-4 sm:px-6">
        <div className="flex justify-start gap-2 sm:gap-4">
          <span className="text-gray-500">{index}.</span>

          {/* Story Title, author, points, comments */}
          <div className="flex flex-col items-start gap-2">
            <Button
              asChild
              variant="link"
              size="content"
              className="text-gray-800 text-md"
            >
              <a href={story.url} className="hover:underline">
                <h4 className="flex flex-wrap text-wrap items-center gap-1">
                  {story.title}
                  {host && (
                    <span
                      aria-label="host"
                      className="text-sm text-gray-500"
                    >{`(${host})`}</span>
                  )}
                  <ExternalLink />
                </h4>
              </a>
            </Button>

            <div className="flex flex-wrap gap-2 sm:gap-6 text-sm text-gray-500">
              <Button
                variant="link"
                size="content"
                className="text-gray-500"
                onClick={() =>
                  toast.info(`User ${story.by}`, { position: "top-center" })
                }
              >
                <User />
                {story.by}
              </Button>

              <Button
                variant="link"
                size="content"
                className="text-gray-500"
                onClick={() =>
                  toast("🎉 Up voted! 🎉", { position: "top-center" })
                }
              >
                <ArrowBigUp />
                {story.score} points
              </Button>
              {story.kids && (
                <Button
                  variant="link"
                  size="content"
                  className="text-gray-500"
                  onClick={() =>
                    toast.info("Comments", { position: "top-center" })
                  }
                >
                  <MessageSquare />
                  {story.kids.length} comments
                </Button>
              )}
              <span className="flex gap-1 items-center [&_svg]:size-4 sm:hidden">
                <Clock />
                {date}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden ml-auto self-start sm:flex">
          <span className="flex items-center gap-2 text-nowrap text-sm text-gray-500 [&_svg]:size-4">
            <Clock />
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
