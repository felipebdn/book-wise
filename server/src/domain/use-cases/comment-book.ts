import { Comment } from "../entities/comment"
import { TextComment } from "../entities/value-objects/comment"
import { CommentRepository } from "../repositories/comment-repository"

interface CommentBookUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

interface CommentBookUseCaseResponse { }

export class CommentBookUseCase {
  constructor(private commentRepository: CommentRepository){}

  async execute(data: CommentBookUseCaseRequest) {
    const comment = new Comment(data)

    await this.commentRepository.create(comment)

    return comment
  }
}
