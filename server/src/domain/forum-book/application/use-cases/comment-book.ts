import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/comment-repository'

interface CommentBookUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

interface CommentBookUseCaseResponse {
  rating: Rating
}

export class CommentBookUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    assessment,
    bookId,
    comment,
    readerId,
  }: CommentBookUseCaseRequest): Promise<CommentBookUseCaseResponse> {
    const rating = Rating.create({
      assessment,
      comment,
      bookId: new UniqueEntityID(bookId),
      readerId: new UniqueEntityID(readerId),
    })

    await this.ratingRepository.create(rating)

    return { rating }
  }
}
