import type { PaginationType } from "@/types";
import { useState } from "react";

type UsePaginationProps = Partial<PaginationType>;

export const usePagination = ({
  page: defaultPage = 1,
  size: defaultSize = 10,
}: UsePaginationProps) => {
  const [page, setPage] = useState(defaultPage);
  const [size, setSize] = useState(defaultSize);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    const prev = page - 1;
    setPage(prev < 1 ? 1 : prev);
  };

  const handleSizeChange = (size: string) => {
    setSize(Number(size));
    setPage(1);
  };

  return { page, size, handleNextPage, handlePrevPage, handleSizeChange };
};
