import type { PaginationType } from "@/types";
import { useState } from "react";

type UsePaginationProps = Partial<PaginationType>;

export const usePagination = ({
  page: defaultPage = 1,
  size: defaultSize = 10,
}: UsePaginationProps) => {
  const [page, setPage] = useState(defaultPage);
  const [size, setSize] = useState(defaultSize);

  const handleNextPage = (toLastPage?: boolean, maxSize?: number) => {
    const maxPage = Math.round((maxSize || size) / size);
    if (toLastPage) {
      setPage(maxPage);
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage > maxPage ? maxPage : nextPage);
  };

  const handlePrevPage = (toFirstPage?: boolean) => {
    if (toFirstPage) {
      setPage(1);
      return;
    }
    const prev = page - 1;
    setPage(prev < 1 ? 1 : prev);
  };

  const handleSizeChange = (size: string) => {
    setSize(Number(size));
    setPage(1);
  };

  return { page, size, handleNextPage, handlePrevPage, handleSizeChange };
};
