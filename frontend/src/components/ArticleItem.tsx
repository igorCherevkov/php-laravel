import { Link } from "react-router-dom";
import styles from "../assets/styles/ArticleItem.module.css";
import type { ArticleItemProps } from "../types";
import { MAX_CONTENT_LENGTH } from "../constants";
import { formatDate } from "../utils/dateFormatter";

export const ArticleItem = ({
  article,
  fullContent = false,
}: ArticleItemProps) => {
  if (!article) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Статья не найдена</p>
      </div>
    );
  }

  const displayContent =
    !fullContent && article.content.length > MAX_CONTENT_LENGTH
      ? article.content.slice(0, MAX_CONTENT_LENGTH) + "..."
      : article.content;

  return (
    <div className={styles.container}>
      <span className={styles.date}>{formatDate(article.created_at)}</span>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.content}>{displayContent}</p>

      {!fullContent && (
        <Link to={`/articles/${article.id}`} className={styles.link}>
          Смотреть комментарии
        </Link>
      )}
    </div>
  );
};
