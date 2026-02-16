import { useGetStoryIds } from "@/data-access/api";
import { usePagination } from "@/hooks/usePagination";
import type { Category } from "@/types";
import { StoriesPagination } from "./StoriesPagination";
import { StoryCard } from "./StoryCard";

type StoriesProps = {
  category: Category;
};

export function Stories({ category }: StoriesProps) {
  const { page, size, ...paginationProps } = usePagination({});
  const { paginatedIds, data: storyIds } = useGetStoryIds({
    category,
    pagination: { page, size },
  });

  const totalItems = storyIds?.length;
  const pageOffset = (page - 1) * size;
  const getDisplayIndex = (idx: number) => pageOffset + idx + 1;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        {paginatedIds.map((id, index) => (
          <StoryCard key={id} id={id} index={getDisplayIndex(index)} />
        ))}
      </div>

      <StoriesPagination
        totalItems={totalItems}
        page={page}
        size={size}
        {...paginationProps}
      />
    </div>
  );
}
