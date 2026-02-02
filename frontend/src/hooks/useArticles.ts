import { useState, useCallback } from "react";
import { fetchArticles, createArticle } from "../api/articles";
import type { Article } from "../types";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadArticles = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await fetchArticles(pageNumber);
      setArticles(res.data);
      setLastPage(res.last_page);
      setPage(pageNumber);
    } catch (err) {
      console.error("Ошибка загрузки статей:", err);
      alert("Ошибка загрузки статей. Проверьте подключение к серверу.");
      setArticles([]);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, []);

  const addArticle = useCallback(async (title: string, content: string) => {
    try {
      setLoading(true);
      const newArticle = await createArticle({ title, content });
      setArticles((prev) => [newArticle, ...prev]);
      return true;
    } catch (err) {
      console.error("Ошибка создания статьи:", err);
      alert("Ошибка создания статьи. Попробуйте позже.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    articles,
    page,
    lastPage,
    loading,
    setPage,
    loadArticles,
    addArticle,
  };
};
