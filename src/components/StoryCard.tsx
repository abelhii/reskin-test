import { useGetStory } from "@/data-access/api";

type StoryCardProps = {
  id: string;
};

export function StoryCard({ id }: StoryCardProps) {
  const { data: story } = useGetStory(id);

  if (!story) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-start">
      <a href={story.url} target="_blank">
        <h3>{story.title}</h3>
      </a>
      <div className="flex gap-2">
        <span className="text-sm text-gray-400">{story.score} points</span>
        <span className="text-sm text-gray-400">
          {new Date(story.time * 1000).toDateString()}
        </span>
        <span className="text-sm text-gray-400">{story.type}</span>
      </div>
    </div>
  );
}
