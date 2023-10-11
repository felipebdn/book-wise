import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentRepository } from '../repositories/comment-repository'
import { Comment } from '../../enterprise/entities/comment'

interface CommentBookUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

export class CommentBookUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({
    assessment,
    bookId,
    comment,
    readerId,
  }: CommentBookUseCaseRequest) {
    const createComment = Comment.create({
      assessment,
      comment,
      bookId: new UniqueEntityID(bookId),
      readerId: new UniqueEntityID(readerId),
    })

    await this.commentRepository.create(createComment)

    return createComment
  }
}
