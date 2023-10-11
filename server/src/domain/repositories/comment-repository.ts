import { Comment } from "../entities/comment";

export interface CommentRepository {
  create(comment: Comment):Promise<void>
}