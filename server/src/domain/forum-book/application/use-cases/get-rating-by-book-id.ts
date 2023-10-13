import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetRatingByBookIdUseCaseRequest {
  bookId: string
}

interface GetRatingByBookIdUseCaseResponse {
  ratings: Rating[]
}

export class GetRatingByBookIdUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    bookId,
  }: GetRatingByBookIdUseCaseRequest): Promise<GetRatingByBookIdUseCaseResponse> {
    const ratings = await this.ratingRepository.findByBookId(bookId)

    return { ratings }
  }
}
