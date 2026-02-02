import styles from "../assets/styles/CommentsList.module.css";
import type { Comment } from "../types";
import { formatDate } from "../utils/dateFormatter";

interface CommentsListProps {
  comments: Comment[];
  loading?: boolean;
}

export const CommentsList = ({ comments, loading }: CommentsListProps) => {
  if (loading) {
    return <div className={styles.loading}>Загрузка комментариев...</div>;
  }

  if (!comments || comments.length === 0) {
    return <p className={styles.noComments}>Комментариев пока нет</p>;
  }

  return (
    <ul className={styles.commentsList}>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.comment}>
          <div className={styles.commentHeader}>
            <strong className={styles.author}>{comment.author_name}</strong>
            <span className={styles.date}>
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className={styles.content}>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};
