export type Category = 'top' | 'new'

export const CategoryPaths: Record<Category, string> = {
  top: 'topstories.json',
  new: 'newstories.json'
}

export type Story = {
  id: string;
  by: string;
  title: string;
  type: "story";
  url: string;
  descendants: number;
  kids: string[];
  score: number;
  time: number;
};

export type Pagination = {
  page: number;
  size: number;
};
