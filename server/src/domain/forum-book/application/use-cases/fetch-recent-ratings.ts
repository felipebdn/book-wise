import { Either, right } from '@/core/either'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface FetchRecentRatingUseCaseRequest {
  page: number
  amount: number
}

type FetchRecentRatingUseCaseResponse = Either<
  null,
  {
    ratings: Rating[]
  }
>

export class FetchRecentRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    page,
    amount,
  }: FetchRecentRatingUseCaseRequest): Promise<FetchRecentRatingUseCaseResponse> {
    const ratings = await this.ratingRepository.findMany({ amount, page })

    return right({ ratings })
  }
}
