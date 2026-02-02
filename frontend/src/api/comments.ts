import type { CreateComment } from "../types";
import client from "./client";

export const createComment = async (
  articleId: number,
  comment: CreateComment,
) => {
  const { data } = await client.post(
    `/articles/${articleId}/comments`,
    comment,
  );

  return data;
};
