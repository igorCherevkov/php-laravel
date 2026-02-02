import type { Article, CreateArticle, PaginatedArticles } from "../types";
import client from "./client";

export const fetchArticles = async (page = 1): Promise<PaginatedArticles> => {
  const { data } = await client.get("/articles", {
    params: { page },
  });

  return data;
};

export const fetchArticle = async (id: number): Promise<Article> => {
  const { data } = await client.get(`/articles/${id}`);

  return data;
};

export const createArticle = async (
  article: CreateArticle,
): Promise<Article> => {
  const { data } = await client.post("/articles", article);

  return data;
};
