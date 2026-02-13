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
