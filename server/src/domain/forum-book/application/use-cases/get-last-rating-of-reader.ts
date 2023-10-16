import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetLastRatingOfReaderRequest {
  readerId: string
}

interface GetLastRatingOfReaderResponse {
  rating: Rating
}

export class GetLastRatingOfReader {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    readerId,
  }: GetLastRatingOfReaderRequest): Promise<GetLastRatingOfReaderResponse> {
    const rating = await this.ratingRepository.getLastByReaderId(readerId)

    return { rating }
  }
}
