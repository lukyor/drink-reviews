export type Review = {
  id: string;
  name: string;
  category: string;
  score: number;
  notes: string;
  image_url: string | null;
  created_at: string;
};

export type Comment = {
  id: string;
  review_id: string;
  author_name: string;
  body: string;
  score: number | null;
  created_at: string;
};
