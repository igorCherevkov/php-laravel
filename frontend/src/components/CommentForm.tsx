import { useState } from "react";
import styles from "../assets/styles/CommentForm.module.css";
import { MOCK_AUTHOR_NAME } from "../constants";

interface CommentFormProps {
  onSubmit: (content: string, authorName: string) => Promise<void>;
  loading?: boolean;
  defaultAuthorName?: string;
}

export const CommentForm = ({
  onSubmit,
  loading = false,
  defaultAuthorName = MOCK_AUTHOR_NAME,
}: CommentFormProps) => {
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(defaultAuthorName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    await onSubmit(content, authorName);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Ваше имя"
          className={styles.input}
          disabled={loading}
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ваш комментарий"
          className={styles.textarea}
          disabled={loading}
          required
        />
      </div>
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};
