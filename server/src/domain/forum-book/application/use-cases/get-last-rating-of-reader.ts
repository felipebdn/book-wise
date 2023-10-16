import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetLastRatingOfReaderUseCaseRequest {
  readerId: string
}

interface GetLastRatingOfReaderUseCaseResponse {
  rating: Rating
}

export class GetLastRatingOfReaderUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    readerId,
  }: GetLastRatingOfReaderUseCaseRequest): Promise<GetLastRatingOfReaderUseCaseResponse> {
    const rating = await this.ratingRepository.getLastByReaderId(readerId)

    return { rating }
  }
}
