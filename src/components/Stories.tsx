import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
import { usePagination } from "@/hooks/usePagination";
import type { Category } from "@/types";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { StoryCard } from "./StoryCard";

type StoriesProps = {
  category: Category;
};

export function Stories({ category }: StoriesProps) {
  const {
    page,
    size,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    changeSize,
  } = usePagination({});
  const { paginatedIds, data: storyIds } = useGetStoryIds({
    category,
    pagination: { page, size },
  });

  const totalItems = storyIds?.length;
  const getDisplayIndex = (idx: number) => idx + 1 + (page - 1) * size;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start gap-2">
        {paginatedIds.map((id, index) => (
          <StoryCard key={id} id={id} index={getDisplayIndex(index)} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div className="flex w-fit items-center gap-4">
          <label className="hidden sm:block" htmlFor="select-rows-per-page">
            Rows per page
          </label>
          <Select
            aria-label="Select rows per page"
            defaultValue={(size || 10).toString()}
            onValueChange={(newSize) => changeSize(Number(newSize))}
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
              <PaginationLink
                aria-label="Go to first page"
                onClick={goToFirstPage}
              >
                <ChevronsLeftIcon />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious onClick={prevPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                aria-label="page number"
                isActive
                className="bg-white"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => nextPage(totalItems)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                aria-label="Go to last page"
                onClick={() => goToLastPage(totalItems || size)}
              >
                <ChevronsRightIcon />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
