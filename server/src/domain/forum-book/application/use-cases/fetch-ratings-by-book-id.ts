import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetRatingByBookIdUseCaseRequest {
  bookId: string
  page: number
  amount: number
}

interface GetRatingByBookIdUseCaseResponse {
  ratings: Rating[]
}

export class GetRatingByBookIdUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    bookId,
    page,
    amount,
  }: GetRatingByBookIdUseCaseRequest): Promise<GetRatingByBookIdUseCaseResponse> {
    const ratings = await this.ratingRepository.findManyByBookId(bookId, {
      page,
      amount,
    })

    return { ratings }
  }
}
