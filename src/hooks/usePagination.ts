import { useState } from "react";

type UsePaginationProps = {
  page?: number;
  size?: number;
};

export const usePagination = ({
  page: initialPage = 1,
  size: initialSize = 10,
}: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const getMaxPage = (totalItems: number) => {
    return Math.ceil(totalItems / size);
  };

  const goToPage = (newPage: number, totalItems?: number) => {
    if (!totalItems) {
      setPage(Math.max(1, newPage));
      return;
    }

    const maxPage = getMaxPage(totalItems);
    const clamped = Math.min(Math.max(1, newPage), maxPage);
    setPage(clamped);
  };

  const nextPage = (totalItems?: number) => {
    goToPage(page + 1, totalItems);
  };

  const prevPage = () => {
    goToPage(page - 1);
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = (totalItems: number) => {
    setPage(getMaxPage(totalItems));
  };

  const changeSize = (newSize: number) => {
    setSize(newSize);
    setPage(1);
  };

  return {
    page,
    size,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    goToPage,
    changeSize,
  };
};
