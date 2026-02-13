import { useGetStories } from "@/data-access/api";

export function FrontPage() {
  const { data: stories } = useGetStories({type: 'new'});

  return (
    <section className="flex flex-col items-center justify-center gap-8 my-8">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to Hacker News</h1>

      {stories && (
        <div className="flex flex-col items-start gap-4">
          {stories.map((story) => (
            <div className="flex flex-col items-start">
              <a href={story.url} target="_blank">
                <h3>{story.title}</h3>
              </a>
              <span className="text-sm text-gray-400">
                {story.score} points
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
