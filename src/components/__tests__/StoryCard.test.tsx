import { useGetStory } from "@/data-access/api";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoryCard } from "../StoryCard";

vi.mock("@/data-access/api");
vi.mock("@/lib/logger");

const mockedUseGetStory = vi.mocked(useGetStory, { partial: true });

describe("StoryCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when StoryCard is rendered", () => {
    it("should return the card contents", () => {
      mockedUseGetStory.mockReturnValue({
        data: {
          title: "My Story",
          url: "https://example.com/article",
          score: 123,
          time: 1700000000,
          by: "john_doe",
        },
        isLoading: false,
        isError: false,
        error: null,
      });

      render(<StoryCard id="1" index={5} />);

      // index
      expect(screen.getByText("5.")).toBeInTheDocument();

      // title
      expect(
        screen.getByRole("heading", { name: /my story/i }),
      ).toBeInTheDocument();

      // link
      expect(screen.getByRole("link", { name: /my story/i })).toHaveAttribute(
        "href",
        "https://example.com/article",
      );

      // host extracted correctly
      expect(screen.queryByLabelText('host')).toBeInTheDocument();
      expect(screen.getByText("(example.com)")).toBeInTheDocument();

      // metadata
      expect(screen.getByText(/123 points/i)).toBeInTheDocument();
      expect(screen.getByText(/john_doe/i)).toBeInTheDocument();
    });

    it("should not return the host if url is undefined", () => {
      mockedUseGetStory.mockReturnValue({
        data: {
          title: "My Story",
          url: null,
          score: 123,
          time: 1700000000,
          by: "john_doe",
        },
        isLoading: false,
        isError: false,
        error: null,
      });

      render(<StoryCard id="1" index={5} />);

      expect(screen.queryByLabelText('host')).not.toBeInTheDocument();
    });
  });

  describe("when isLoading is true", () => {
    it("should render the loading card", () => {
      mockedUseGetStory.mockReturnValue({
        isLoading: true,
      });

      render(<StoryCard id="1" index={0} />);

      expect(screen.getByLabelText("Loading...")).toBeInTheDocument();
    });
  });

  describe("when there is an error", () => {
    it("should render the error card", () => {
      mockedUseGetStory.mockReturnValue({ isError: true });

      render(<StoryCard id="1" index={0} />);

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /abelhii@outlook.com/i }),
      ).toHaveAttribute("href", "mailto:abelhii@gmail.com");
    });
  });
});
