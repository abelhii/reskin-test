import { describe, expect, it } from "vitest";

import { act, renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should use default values", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    expect(result.current.size).toBe(10);
  });

  it("should use the provided initial values", () => {
    const { result } = renderHook(() => usePagination({ page: 3, size: 25 }));

    expect(result.current.page).toBe(3);
    expect(result.current.size).toBe(25);
  });

  describe("goToPage", () => {
    it("should go to a specific page and clamp properly", () => {
      const { result } = renderHook(() => usePagination({ size: 10 }));

      act(() => {
        result.current.goToPage(100, 30); // maxPage = 3
      });

      expect(result.current.page).toBe(3);
    });
  });

  describe("nextPage", () => {
    it("should increment the page", () => {
      const { result } = renderHook(() => usePagination({ page: 1 }));

      act(() => {
        result.current.nextPage();
      });

      expect(result.current.page).toBe(2);
    });

    it("should not go past the max page", () => {
      const { result } = renderHook(() => usePagination({ page: 2, size: 10 }));

      act(() => {
        result.current.nextPage(20); // maxPage = 2
      });

      expect(result.current.page).toBe(2);
    });
  });

  describe("prevPage", () => {
    it("should decrement the page", () => {
      const { result } = renderHook(() => usePagination({ page: 3 }));

      act(() => {
        result.current.prevPage();
      });

      expect(result.current.page).toBe(2);
    });

    it("should not go below 1", () => {
      const { result } = renderHook(() => usePagination({ page: 1 }));

      act(() => {
        result.current.prevPage();
      });

      expect(result.current.page).toBe(1);
    });
  });

  describe("goToLastPage", () => {
    it("should go to last page correctly", () => {
      const { result } = renderHook(() => usePagination({ size: 10 }));

      act(() => {
        result.current.goToLastPage(14);
      });

      expect(result.current.page).toBe(2); // ceil(14/10)
    });
  });

  describe("goToFirstPage", () => {
    it("should go to first page", () => {
      const { result } = renderHook(() => usePagination({ page: 5 }));

      act(() => {
        result.current.goToFirstPage();
      });

      expect(result.current.page).toBe(1);
    });
  });

  describe("changeSize", () => {
    it("should change size and reset the page", () => {
      const { result } = renderHook(() => usePagination({ page: 4, size: 10 }));

      act(() => {
        result.current.changeSize(25);
      });

      expect(result.current.size).toBe(25);
      expect(result.current.page).toBe(1);
    });
  });
});
