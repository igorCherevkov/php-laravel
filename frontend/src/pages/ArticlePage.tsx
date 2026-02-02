import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../assets/styles/ArticlePage.module.css";
import { ArticleItem } from "../components/ArticleItem";
import { CommentsList } from "../components/CommentsList";
import { CommentForm } from "../components/CommentForm";
import { useArticle } from "../hooks/useArticle";

export const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [, setComment] = useState("");
  const { article, loading, loadArticle, addComment } = useArticle();

  useEffect(() => {
    if (id) {
      loadArticle(Number(id));
    } else {
      alert("id статьи не указан");
    }
  }, [id, loadArticle]);

  const handleCommentSubmit = async (content: string, authorName: string) => {
    const success = await addComment(content, authorName);
    if (success) {
      setComment("");
    }
  };

  if (loading && !article) {
    return <div className={styles.loading}>Загрузка статьи...</div>;
  }

  if (!article) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Назад к статьям
        </Link>
        <div className={styles.error}>
          <p>Статья не найдена</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Назад к статьям
      </Link>

      <ArticleItem article={article} fullContent />

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Комментарии</h2>

        <CommentsList comments={article.comments || []} loading={loading} />

        <div className={styles.commentFormWrapper}>
          <h3 className={styles.addCommentTitle}>Добавить комментарий</h3>
          <CommentForm onSubmit={handleCommentSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};
