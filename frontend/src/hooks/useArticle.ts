import { useState, useCallback } from "react";
import { fetchArticle } from "../api/articles";
import { createComment } from "../api/comments";
import type { Article } from "../types";

export const useArticle = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  const loadArticle = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const data = await fetchArticle(id);
      setArticle(data);
    } catch (err) {
      console.error("Ошибка загрузки статьи:", err);
      alert("Ошибка загрузки статьи. Проверьте подключение к серверу.");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = useCallback(
    async (content: string, authorName = "Test User") => {
      if (!article) {
        alert("Статья не загружена");
        return null;
      }

      if (!content.trim()) {
        alert("Введите текст комментария");
        return null;
      }

      try {
        setLoading(true);
        await createComment(article.id, {
          content,
          author_name: authorName,
        });

        const updatedArticle = await fetchArticle(article.id);
        setArticle(updatedArticle);
        return true;
      } catch (err) {
        console.error("Ошибка добавления комментария:", err);
        alert("Ошибка добавления комментария");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [article],
  );

  return {
    article,
    loading,
    loadArticle,
    addComment,
  };
};
