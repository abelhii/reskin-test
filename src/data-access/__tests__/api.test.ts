import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../../test/server";
import { createTestWrapper } from "../../test/utils.tsx";
import { useGetStory, useGetStoryIds } from "../api.ts";

describe("useGetStoryIds", () => {
  it("returns paginated ids", async () => {
    const mockIds = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

    server.use(
      http.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
        ({ request }) => {
          expect(new URL(request.url).searchParams.get("print")).toBe("pretty");
          return HttpResponse.json(mockIds);
        },
      ),
    );

    const { result } = renderHook(
      () => useGetStoryIds({ pagination: { page: 2, size: 10 } }),
      { wrapper: createTestWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.paginatedIds).toEqual(mockIds.slice(10, 20));
  });
});

describe("useGetStory", () => {
  it("fetches a story by id", async () => {
    const mockStory = {
      id: 123,
      title: "Test Story",
      by: "author",
      url: "https://example.com",
    };

    server.use(
      http.get(
        `https://hacker-news.firebaseio.com/v0/item/123.json`,
        ({ request }) => {
          expect(new URL(request.url).searchParams.get("print")).toBe("pretty");
          return HttpResponse.json(mockStory);
        },
      ),
    );

    const { result } = renderHook(() => useGetStory("123"), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockStory);
  });
});
