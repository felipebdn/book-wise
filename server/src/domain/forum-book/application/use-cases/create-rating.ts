import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface CreateRatingUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

interface CreateRatingUseCaseResponse {
  rating: Rating
}

export class CreateRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    assessment,
    bookId,
    comment,
    readerId,
  }: CreateRatingUseCaseRequest): Promise<CreateRatingUseCaseResponse> {
    const createRating = Rating.create({
      assessment,
      comment,
      bookId: new UniqueEntityID(bookId),
      readerId: new UniqueEntityID(readerId),
    })

    const rating = await this.ratingRepository.create(createRating)

    return { rating }
  }
}
