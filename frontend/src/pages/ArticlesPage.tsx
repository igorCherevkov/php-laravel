import { useState, useEffect } from "react";
import styles from "../assets/styles/ArticlesPage.module.css";
import { ArticleItem } from "../components/ArticleItem";
import { useArticles } from "../hooks/useArticles";

export const ArticlesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    articles,
    page,
    lastPage,
    loading,
    setPage,
    loadArticles,
    addArticle,
  } = useArticles();

  useEffect(() => {
    loadArticles(1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Введите заголовок статьи");
      return;
    }

    if (!content.trim()) {
      alert("Введите текст статьи");
      return;
    }

    const success = await addArticle(title, content);
    if (success) {
      setTitle("");
      setContent("");
      setPage(1);
      loadArticles(1);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;

    try {
      await loadArticles(newPage);
    } catch (err) {}
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Лента статей</h1>

      <form onSubmit={handleSubmit} className={styles.articleForm}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок статьи"
          className={styles.input}
          disabled={loading}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Текст статьи"
          className={styles.textarea}
          disabled={loading}
          rows={4}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Добавление..." : "Добавить статью"}
        </button>
      </form>

      {loading && articles.length === 0 && (
        <div className={styles.loading}>Загрузка статей...</div>
      )}

      <div className={styles.articles}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              fullContent={false}
            />
          ))
        ) : !loading ? (
          <div className={styles.noArticles}>
            <p>Статей пока нет.</p>
          </div>
        ) : null}
      </div>

      {articles.length > 0 && lastPage > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1 || loading}
            onClick={() => handlePageChange(page - 1)}
            className={styles.paginationButton}
          >
            ← Назад
          </button>

          <span className={styles.pageInfo}>
            Страница {page} из {lastPage}
          </span>

          <button
            disabled={page === lastPage || loading}
            onClick={() => handlePageChange(page + 1)}
            className={styles.paginationButton}
          >
            Вперёд →
          </button>
        </div>
      )}
    </div>
  );
};
