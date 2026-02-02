import type { Comment } from "./";

export interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  comments: Comment[];
}

export interface PaginatedArticles {
  data: Article[];
  current_page: number;
  last_page: number;
}

export interface CreateArticle {
  title: string;
  content: string;
}
