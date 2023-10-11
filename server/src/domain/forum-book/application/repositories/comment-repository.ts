import { Comment } from '../../enterprise/entities/comment'

export interface CommentRepository {
  create(comment: Comment): Promise<void>
}
