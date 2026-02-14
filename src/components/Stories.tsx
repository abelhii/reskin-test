import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetStoryIds } from "@/data-access/api";
import type { Category } from "@/types";
import { StoryCard } from "./StoryCard";
import { usePagination } from "@/hooks/usePagination";

type StoriesProps = {
  category: Category;
};

export function Stories({ category }: StoriesProps) {
  const { page, size, handleNextPage, handlePrevPage, handleSizeChange } =
    usePagination({});
  const { storyIds } = useGetStoryIds({ category, pagination: { page, size } });

  const getDisplayIndex = (idx: number) => idx + 1 + (page - 1) * size;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start gap-2">
        {storyIds.map((id, index) => (
          <StoryCard key={id} id={id} index={getDisplayIndex(index)} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div className="flex w-fit items-center gap-4">
          <label htmlFor="select-rows-per-page">Rows per page</label>
          <Select
            defaultValue={(size || 10).toString()}
            onValueChange={handleSizeChange}
          >
            <SelectTrigger className="w-20 bg-white" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
            Page {page}
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
